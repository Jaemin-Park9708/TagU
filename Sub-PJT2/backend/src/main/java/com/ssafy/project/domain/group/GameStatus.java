package com.ssafy.project.domain.group;

import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.Image;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "game_status")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class GameStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    private MeetingRoom meetingRoom;

    @Column
    private int readyNum;

    @Column
    private int rejectNum;

    @Builder
    public GameStatus(MeetingRoom meetingRoom) {
        this.meetingRoom = meetingRoom;
        this.readyNum = 1;
        this.rejectNum = 0;
    }

    public void accept() {
        this.readyNum++;
    }
    public void reject() {
        this.rejectNum++;
    }
}
