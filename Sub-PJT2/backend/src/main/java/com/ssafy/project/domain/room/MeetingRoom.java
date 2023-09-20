package com.ssafy.project.domain.room;


import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "room_type")
@Getter
@Entity
public abstract class MeetingRoom extends BaseTimeEntity implements Serializable {

    private static final long serialVersionUID = 34789214329287934L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_room_id")
    private Long id;

    @Enumerated(value = EnumType.STRING)
    private MeetingRoomStatus status = MeetingRoomStatus.INACTIVE;

    private String sessionId;

    @OneToMany(mappedBy = "meetingRoom", cascade = CascadeType.ALL)
    private List<User> userList = new ArrayList<>(); // 남자, 여자

    public void addUser(User user){
        this.userList.add(user);
        user.setMeetingRoom(this);
    }

    // 연관관계 편의 메소드
    public void removeUser(User user){
        user.quitRoom();
        this.userList.remove(user);
    }

    public void clearUser(){
        for (User user : this.userList) {
            user.quitRoom();
        }
        this.userList.clear();
    }

    public void changeStatus(MeetingRoomStatus status){
        this.status = status;
    }

    public void setSessionId(String sessionId){
        this.sessionId = sessionId;
    }
}


