package com.ssafy.project.domain.user;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.dto.request.UserInfoReqDto;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String userEmail;

//    @Column//(nullable = false)
//    private String userPassword;

    @Column(nullable = false)
    private String userName;

    @Column//(nullable = false)
    private String phoneNumber;

    @Column//(nullable = false)
    private int userAge;

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "main_image_id")
    private Image mainImage;

    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column//(nullable = false)
    private int userLike;

    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.USER;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column
    private String sessionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private MeetingGroup meetingGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_room_id")
    private MeetingRoom meetingRoom;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Profile profile;

    @Builder //// 여기 나중에 조건에 맞게 수정해야댐
    public User(String userEmail, String userName) {
        this.userEmail = userEmail;
        this.userName = userName;
    }

    public void changeUser(UserInfoReqDto userInfoReqDto) {
        this.phoneNumber = userInfoReqDto.getPhoneNumber();
        this.userAge = userInfoReqDto.getUserAge();
        this.userGender = userInfoReqDto.getUserGender();
        this.userLike = 0;
    }

    public void quitMeetingGroup() {
        this.meetingGroup = null;
    }

    public void quitRoom() {
        this.meetingRoom = null;
    }

    // 연관관계 편의 메서드
    public void setMeetingGroup(MeetingGroup meetingGroup) {
        if (this.getMeetingGroup() != null) {
            this.getMeetingGroup().quitGroup(this);
        }
        this.meetingGroup = meetingGroup;
        meetingGroup.getGroupUser().add(this);
    }

    public void setUserImg(Image img) {
        this.mainImage = img;
    }

    public void setMeetingRoom(MeetingRoom meetingRoom) {
        this.meetingRoom = meetingRoom;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
    }

    public void setSessionId(String sessionId){
        this.sessionId = sessionId;
    }
}