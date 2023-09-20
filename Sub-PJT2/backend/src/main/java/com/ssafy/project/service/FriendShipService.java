package com.ssafy.project.service;

import com.querydsl.core.Tuple;
import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.NoticeReqDto;
import com.ssafy.project.dto.response.FriendInfoRspDto;
import com.ssafy.project.dto.response.FriendRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.FriendShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendShipService {
    private final FriendShipRepository friendShipRepository;
    private final NoticeService noticeService;
    private final UserService userService;

    /**
     * 친구 요청
     */
    public FriendRspDto requestFriendShip(Long userId, Long targetUserId) {
        // 동일한 유저인지 체크
        checkEqualUser(userId, targetUserId);

        // 유효한 유저인지 체크
        User user = userService.findUser(userId).orElseThrow(() -> new NotFoundException("현재 유효하지 않은 유저입니다."));

        // 유효한 친구인지 체크
        User targetUser = userService.findUser(targetUserId).orElseThrow(() -> new NotFoundException("해당하는 친구 유저를 찾을 수 없습니다."));

        findFriendShip(userId, targetUserId)
                .ifPresent(friendShip -> {
                    if(friendShip.getFriendShipStatus().equals(FriendShipStatus.REQUESTED)){
                        throw new IllegalStateException("이미 친구 요청을 보냈습니다.");
                    }
                    if(friendShip.getFriendShipStatus().equals(FriendShipStatus.FRIEND)){
                        throw new IllegalStateException("이미 친구입니다.");
                    }
                    if(friendShip.getFriendShipStatus().equals(FriendShipStatus.RECEIVED)){
                        throw new IllegalStateException("이미 친구 요청을 받았습니다.");
                    }
                    if(friendShip.getFriendShipStatus().equals(FriendShipStatus.BLOCKED)){
                        throw new IllegalStateException("이미 차단한 유저입니다.");
                    }
                });
        // 전송 유저
        FriendShip requestToFriend = saveFriendShip(new FriendShip(user, targetUser, FriendShipStatus.REQUESTED));

        findFriendShip(targetUserId, userId)
                .ifPresentOrElse(targetFriendShip -> {
                            // 차단 유저 처리 여부
                            Optional.of(targetFriendShip)
                                    .filter(friend ->
                                            friend.getFriendShipStatus().equals(FriendShipStatus.BLOCKED))
                                    .map(friend -> new FriendRspDto(requestToFriend));
                        },
                        () -> {
                            // 수신 유저
                            saveFriendShip(new FriendShip(targetUser, user, FriendShipStatus.RECEIVED));

                            String requestContent = "미팅 친구 요청 : "
                                    + user.getUserName()
                                    + "님이 보내온 친구 요청입니다!!";

                            NoticeReqDto noticeReqDto = new NoticeReqDto(targetUser.getId(), NoticeType.FRIEND_REQUEST,requestContent);
                            noticeService.insertNotice(noticeReqDto);
                        });
        return new FriendRspDto(requestToFriend);
    }

    /**
     * 친구 수락
     */
    public FriendRspDto acceptFriendShip(Long userId, Long targetUserId) {
        // 친구 요청 발송 여부
        FriendShip requestUser =
                findFriendShip(targetUserId, userId)
                        .map(friendShip ->
                                Optional.of(friendShip).filter(friend ->
                                                friend.getFriendShipStatus().equals(FriendShipStatus.REQUESTED))
                                        .orElseThrow(() -> new IllegalStateException("친구 요청이 진행되지 않았습니다.")))
                        .orElseThrow(() -> new NotFoundException("해당 친구 요청을 찾을 수 없습니다."));

        // 친구 요청 수신 여부
        FriendShip receiveUser =
                findFriendShip(userId, targetUserId)
                        .map(friendShip ->
                                Optional.of(friendShip).filter(friend ->
                                                friend.getFriendShipStatus().equals(FriendShipStatus.RECEIVED))
                                        .orElseThrow(() -> new IllegalStateException("친구 요청 수신이 진행되지 않았습니다.")))
                        .orElseThrow(() -> new NotFoundException("수신된 친구 요청을 찾을 수 없습니다."));

        // 친구 관계 생성
        requestUser.changeStatus(FriendShipStatus.FRIEND);
        receiveUser.changeStatus(FriendShipStatus.FRIEND);

        // 친구 요청 메시지 확인
        findNoticesByUserId(userId)
                .ifPresent(notices -> notices.forEach(notice -> {
                    if(notice.getType().equals(NoticeType.FRIEND_REQUEST) &&
                            notice.getUser().getId().equals(receiveUser.getUser().getId())){
                        notice.readNotice();
                    }
                }));

        return new FriendRspDto(requestUser);
    }

    /**
     * 친구 차단
     */
    public FriendRspDto blockFriendShip(Long userId, Long friendId) {

        return findFriendShip(friendId, userId)
                .filter(friendShip -> friendShip.getFriendShipStatus().equals(FriendShipStatus.FRIEND))
                .map(friendShip -> {
                    friendShip.changeStatus(FriendShipStatus.BLOCKED);
                    return new FriendRspDto(friendShip);
                })
                .orElseThrow(() -> new IllegalStateException("현재 차단하려는 유저와 친구관계가 아닙니다."));
    }

    /**
     * 친구 리스트 조회
     */
    @Transactional(readOnly = true)
    public List<FriendInfoRspDto> findFriendShips(Long userId) {
        return findFriendShipsByUserId(userId)
                .orElseGet(ArrayList::new);
    }

    /**
     * 사용자 검색
     */
    @Transactional(readOnly = true)
    public List<FriendRspDto> findUsers(Long userId, String word) {

        User user = userService.findUser(userId)
                .orElseThrow(() -> new NotFoundException("현재 유효하지 않은 유저입니다."));

        List<FriendRspDto> friendRspDtoList =
                userService.findUsersByKeyWord(word)
                        .map(targetUsers -> targetUsers.stream()
                                .map(targetUser ->{
                                    FriendShip friendShip = findFriendShip(userId, targetUser.getId())
                                            .orElseGet(() -> new FriendShip(user, targetUser, null));
                                    return new FriendRspDto(friendShip);
                                }).collect(Collectors.toList())
                        ).orElseGet(ArrayList::new);

        return friendRspDtoList.stream()
                .filter(friendRspDto -> !friendRspDto.getTargetId().equals(userId))
                .distinct()
                .toList();
    }

    private Optional<FriendShip> checkEqualUser(Long userId, Long targetId) {
        return Optional.ofNullable(userId)
                .filter(id -> id.equals(targetId))
                .map(n -> {
                    throw new IllegalStateException("자기 자신은 친구로 등록할 수 없습니다.");
                });
    }

    private FriendShip saveFriendShip(FriendShip friendShip) {
        return friendShipRepository.save(friendShip);
    }

    private Optional<FriendShip> findFriendShip(Long userId, Long targetId) {
        return Optional.ofNullable(userId).flatMap(n -> friendShipRepository.findByUserIdAndTargetUserId(userId, targetId));
    }

    private Optional<List<FriendInfoRspDto>> findFriendShipsByUserId(Long userId) {
        return Optional.ofNullable(userId)
                .flatMap(friendShipRepository::findFriendInfoAllByUserId);
    }

    private Optional<List<Notice>> findNoticesByUserId(Long userId) {
        List<Notice> notices = new ArrayList<>();
        noticeService.findAllByUserId(userId).ifPresent(noticeList -> notices.addAll(
                noticeList.stream().filter(Notice::isValid).toList())
        );

        return Optional.of(notices)
                .filter(noticeList -> !noticeList.isEmpty());
    }

    public void rejectFriendShip(Long userId, Long otherId) {
        friendShipRepository.deleteByUserIdAndTargetUserId(userId, otherId);
        friendShipRepository.deleteByUserIdAndTargetUserId(otherId, userId);
    }
}
