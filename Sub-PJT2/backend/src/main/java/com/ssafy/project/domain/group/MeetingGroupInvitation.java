package com.ssafy.project.domain.group;

import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MeetingGroupInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="invitation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private MeetingGroup group;

    @Enumerated(EnumType.STRING)
    private InvitationStatus invitationStatus = InvitationStatus.PENDING; // PENDING, ACCEPTED, REJECTED

    @Builder
    public MeetingGroupInvitation(User user, MeetingGroup group) {
        this.user = user;
        this.group = group;
    }

    public void acceptInvitation(){
        this.invitationStatus = InvitationStatus.ACCEPTED;
    }

    public void rejectInvitation(){
        this.invitationStatus = InvitationStatus.REJECTED;
    }

}
