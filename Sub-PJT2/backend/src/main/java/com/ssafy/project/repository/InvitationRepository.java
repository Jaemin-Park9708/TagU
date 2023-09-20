package com.ssafy.project.repository;

import com.ssafy.project.domain.group.MeetingGroupInvitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<MeetingGroupInvitation, Long> {
    Optional<MeetingGroupInvitation> findByUserIdAndGroupId(Long userId, Long groupId);

    Optional<List<MeetingGroupInvitation>> findByUserId(Long uId);

    Optional<List<MeetingGroupInvitation>> findByGroupId(Long groupId);
}
