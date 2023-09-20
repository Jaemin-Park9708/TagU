package com.ssafy.project.service;

import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.group.InvitationStatus;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.group.MeetingGroupInvitation;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.request.NoticeReqDto;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final NoticeService noticeService;
    private final InvitationService invitationService;


    /**
     * 그룹 조회
     */
    public GroupRspDto getGroup(Long userId) {
       User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 조회할 유저가 존재하지 않습니다."));

       if(user.getMeetingGroup() == null)
            return null;

       return findMeetingGroup(user.getMeetingGroup().getId())
                .map(GroupRspDto::new)
                .orElseGet(null);
    }

    /**
     * 그룹 생성
     */
    public GroupRspDto createGroup(Long userId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 만들 유저가 존재하지 않습니다."));

        userService.checkUserGender(user);
        checkUserValidation(user);

        MeetingGroup meetingGroup = MeetingGroup.builder()
                .groupGender(user.getUserGender())
                .build();
        saveMeetingGroup(meetingGroup);
        user.setMeetingGroup(meetingGroup);
        log.info("createGroup : " + meetingGroup);
        return new GroupRspDto(meetingGroup);
    }

    /**
     * 그룹원 초대
     */
    public GroupRspDto inviteGroup(Long userId, GroupReqDto groupReqDto){
        // 동일한 유저인지 체크
        checkEqualUser(userId, groupReqDto.getTargetUserId());

        User targetUser = userService.findUser(groupReqDto.getTargetUserId())
                .orElseThrow(() -> new NotFoundException("그룹에 초대할 해당 유저가 존재하지 않습니다."));
        checkUserValidation(targetUser);

        User sendUser = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 초대할 유저가 존재하지 않습니다."));

        if(sendUser.getMeetingRoom() != null){
            throw new IllegalStateException("미팅방에 입장한 유저는 그룹에 참여할 수 없습니다.");
        }


        // PENDING은 한번만 존재
        invitationService.findInvitation(userId, groupReqDto.getGroupId())
                .filter(invitation -> invitation.getInvitationStatus().equals(InvitationStatus.PENDING))
                .ifPresent(invitation -> {
                    throw new IllegalStateException("이미 초대한 유저입니다.");
                });

        return findMeetingGroup(groupReqDto.getGroupId())
                .filter(group -> group.getGroupGender().equals(targetUser.getUserGender()))
                .map(group -> {

                    // 그룹장 권한
                    Optional.of(group).filter(g -> g.getGroupUser().get(0).getId().equals(userId))
                            .orElseThrow(() -> new IllegalArgumentException("현재 그룹장이 아닙니다."));

                    // 초대 요청
                    invitationService.createInvitation(targetUser, group);

                    String requestContent = "미팅 그룹 요청 : "
                            + sendUser.getUserName()
                            + "님이 보내온 그룹 요청입니다!!";

                    NoticeReqDto noticeReqDto = new NoticeReqDto(sendUser.getId(), NoticeType.GROUP_REQUEST,requestContent);
                    noticeService.insertNotice(noticeReqDto);

                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("초대할 유저의 성별과 해당 그룹의 성별이 일치 하지 않습니다."));
    }

    /**
     * 그룹원 수락
     */
    public GroupRspDto acceptGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹에 수락할 유저가 존재하지 않습니다."));

        checkUserValidation(user);

        // PENDING일때만 수락 가능
        invitationService.findInvitation(userId, groupId)
                .filter(invitation -> invitation.getInvitationStatus() != InvitationStatus.PENDING)
                .ifPresent(invitation -> {
                    throw new IllegalStateException("수락 할 수 없는 그룹 정보 입니다.");
                });

        return findMeetingGroup(groupId)
                .map(group -> {
                    Optional.of(group).filter(g -> g.getGroupUser().size() < 2)
                            .orElseThrow(() ->new IllegalArgumentException("그룹원 최대 인원수에 초과되었습니다."));

                    invitationService.acceptInvitation(user, group);
                    user.setMeetingGroup(group);

                    // 대기방 개념이 그룹이 완성되야 입장할 수 있음
//                    Optional.of(group.getGroupUser().get(0).getMeetingRoom())
//                            .filter(meetingRoom -> meetingRoom.getStatus() == MeetingRoomStatus.INACTIVE)
//                            .map(meetingRoom -> {
//                                meetingRoom.addUser(user);
//                                return meetingRoom;
//                            })
//                            .orElseThrow(() -> new IllegalArgumentException("그룹방이 현재 진행중입니다."));
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹원 거절
     */
    public GroupRspDto rejectGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹에 수락할 유저가 존재하지 않습니다."));

        // PENDING일때만 수락 가능
        invitationService.findInvitation(userId, groupId)
                .filter(invitation -> invitation.getInvitationStatus() != InvitationStatus.PENDING)
                .ifPresent(invitation -> {
                    throw new IllegalStateException("거절 할 수 없는 그룹 정보 입니다.");
                });

        return findMeetingGroup(groupId)
                .map(group -> {
                    invitationService.rejectInvitation(user, group);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 탈퇴
     */
    public GroupRspDto LeaveGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 탈퇴할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
                .map(group -> {
                    // 그룹원 권한
                    if(group.getGroupUser().get(0).getId().equals(userId)){
                        new IllegalArgumentException("그룹장은 그룹을 탈퇴할 수 없습니다.");
                    }
                    group.quitGroup(user);
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 삭제
     */
    public GroupRspDto removeGroup(Long userId, Long groupId){
        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("그룹을 삭제할 유저가 존재하지 않습니다."));

        return findMeetingGroup(groupId)
                .map(group -> {
                    log.info("removeGroup : " + group.getGroupUser().indexOf(user));
                    // 그룹장 권한
                    Optional.of(group).filter(g -> g.getGroupUser().get(0).equals(user))
                            .orElseThrow(() -> new IllegalArgumentException("현재 그룹장이 아닙니다."));

                    // 해당 그룹 요청 리스트 Reject로 변경
                    invitationService.findInvitationByGroupId(groupId)
                                    .filter(invitations -> invitations.stream()
                                            .anyMatch(invitation -> invitation.getInvitationStatus().equals(InvitationStatus.PENDING)))
                                            .map(invitations -> {
                                                invitations.forEach(invitation -> invitation.rejectInvitation());
                                                return invitations;
                                            });

                    group.deleteGroup();
                    return group;
                })
                .map(GroupRspDto::new)
                .orElseThrow(() -> new NotFoundException("그룹이 존재하지 않습니다."));
    }

    /**
     * 그룹 요청 목록 조회
     */
    public List<GroupRspDto> getPendingList(Long uId) {
        List<MeetingGroupInvitation> inv = invitationService.findInvitationByUserId(uId)
                .orElseThrow(() -> new NotFoundException("초대 없음"));
        return inv.stream()
                .filter(meetingGroupInvitation -> meetingGroupInvitation.getInvitationStatus().equals(InvitationStatus.PENDING))
                .map(meetingGroupInvitation -> groupRepository.findById(meetingGroupInvitation.getGroup().getId()))
//                .filter(group -> group.filter(meetingGroup -> meetingGroup.getGroupUser().size() > 0).isPresent())
                .map(Optional::get)
                .map(GroupRspDto::new)
                .collect(Collectors.toList());
    }

    private Optional<FriendShip> checkEqualUser(Long userId, Long targetId) {
        return Optional.ofNullable(userId)
                .filter(id -> id.equals(targetId))
                .map(n -> {
                    throw new IllegalStateException("자기 자신에게 그룹 초대 할 수 없습니다.");
                });
    }

    private void checkUserValidation(User user){
        if (user.getMeetingGroup() != null) {
            throw new IllegalStateException("이미 그룹에 가입한 유저입니다.");
        }

        if(user.getMeetingRoom() != null){
            throw new IllegalStateException("미팅방에 입장한 유저는 그룹에 참여할 수 없습니다.");
        }
    }

    private MeetingGroup saveMeetingGroup(MeetingGroup meetingGroup){
        return groupRepository.save(meetingGroup);
    }

    public Optional<MeetingGroup> findMeetingGroup(Long groupId){
        return Optional.ofNullable(groupId).flatMap(groupRepository::findById);
    }



}

