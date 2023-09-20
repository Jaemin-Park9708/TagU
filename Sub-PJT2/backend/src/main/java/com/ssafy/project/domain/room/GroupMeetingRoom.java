package com.ssafy.project.domain.room;

import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@DiscriminatorValue("G")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class GroupMeetingRoom extends MeetingRoom {

    @Builder
    public GroupMeetingRoom(MeetingGroup newGroup) {
        addUserList(newGroup);
    }

    // 연관관계 편의 메소드
    public void addUserList(MeetingGroup meetingGroup){
        for (User user : meetingGroup.getGroupUser()) {
            this.getUserList().add(user);
            user.setMeetingRoom(this);
        }
    }

    public void removeUser(User user){
        user.quitRoom();
        this.getUserList().remove(user);
    }

    public void removeUserList(MeetingGroup meetingGroup){
        for (User user : meetingGroup.getGroupUser()) {
            user.quitRoom();
            this.getUserList().remove(user);
        }
    }

    public void clearGroupUser(){
        for (User user : this.getUserList()) {
            user.quitRoom();
        }
        this.getUserList().clear();
    }

}