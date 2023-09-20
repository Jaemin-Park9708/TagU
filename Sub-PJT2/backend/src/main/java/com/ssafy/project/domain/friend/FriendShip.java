package com.ssafy.project.domain.friend;


import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class FriendShip extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="friend_ship_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_id")
    private User targetUser;

    @Enumerated(EnumType.STRING)
    private FriendShipStatus friendShipStatus; // NONE, REQUESTED, RECEIVED, FRIEND, BLOCKED

    @Builder
    public FriendShip(User user, User targetUser, FriendShipStatus friendShipStatus) {
        this.user = user;
        this.targetUser = targetUser;
        this.friendShipStatus = friendShipStatus;
    }

    public void changeStatus(FriendShipStatus friendShipStatus){
        this.friendShipStatus = friendShipStatus;
    }
}
