package com.ssafy.project.domain.group;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class MeetingGroup extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private Long id;

    @OneToMany(mappedBy = "meetingGroup", cascade = CascadeType.ALL)
    private List<User> groupUser = new LinkedList<>();

    @Enumerated(EnumType.STRING)
    private Gender groupGender;

    @Builder
    public MeetingGroup(Gender groupGender) {
        this.groupGender = groupGender;
    }

    public void quitGroup(User user){
        user.quitMeetingGroup();
        MeetingRoom meetingRoom = user.getMeetingRoom();
        if(meetingRoom != null){
            meetingRoom.removeUser(user);
        }
        this.groupUser.remove(user);
    }

    public void deleteGroup() {
        for (User user : groupUser) {
            user.quitMeetingGroup();
            MeetingRoom meetingRoom = user.getMeetingRoom();
            if(meetingRoom != null){
                meetingRoom.removeUser(user);
            }
        }
        log.info("deleteGroup : 여기 옴?" + this.groupUser);
        this.groupUser.clear();
    }

}
