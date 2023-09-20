package com.ssafy.project.service;

import com.ssafy.project.domain.group.InvitationStatus;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.group.MeetingGroupInvitation;
import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.repository.InvitationRepository;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InvitationService {
    private final InvitationRepository invitationRepository;

    /**
     * 그룹 요청 추가
     */
    public void createInvitation(User user, MeetingGroup group) {
        MeetingGroupInvitation invitation = MeetingGroupInvitation.builder()
                .user(user)
                .group(group)
                .build();
        saveInvitation(invitation);
    }
    /**
     * 그룹 요청 수락
     */
    public void acceptInvitation(User user, MeetingGroup group) {
        findInvitation(user.getId(), group.getId())
                .filter(invitation -> invitation.getInvitationStatus().equals(InvitationStatus.PENDING))
                .map(invitation -> {
                    invitation.acceptInvitation();
                    return invitation;
                }).orElseThrow(() -> new RuntimeException("그룹 요청이 존재하지 않습니다."));
    }

    /**
     * 그룹 요청 거절
     */
    public void rejectInvitation(User user, MeetingGroup group) {
        findInvitation(user.getId(), group.getId())
                .filter(invitation -> invitation.getInvitationStatus().equals(InvitationStatus.PENDING))
                .map(invitation -> {
                    invitation.rejectInvitation();
                    return invitation;
                }).orElseThrow(() -> new RuntimeException("그룹 요청이 존재하지 않습니다."));
    }

    public Optional<MeetingGroupInvitation> findInvitation(Long userId, Long groupId){
        return invitationRepository.findByUserIdAndGroupId(userId, groupId);
    }

    public Optional<List<MeetingGroupInvitation>> findInvitationByUserId(Long uId) {
        return invitationRepository.findByUserId(uId);
    }

    public Optional<List<MeetingGroupInvitation>> findInvitationByGroupId(Long gId) {
        return invitationRepository.findByGroupId(gId);
    }

    private MeetingGroupInvitation saveInvitation(MeetingGroupInvitation invitation){
        return invitationRepository.save(invitation);
    }

}
