package com.ssafy.project.domain.message;

import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private MessageType messageType;

    @JoinColumn(name = "sender_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;

    @JoinColumn(name = "meeting_room_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingRoom meetingRoom;

    @Builder
    public ChatMessage(String content, MessageType messageType, User sender, MeetingRoom meetingRoom) {
        this.content = content;
        this.messageType = messageType;
        this.sender = sender;
        this.meetingRoom = meetingRoom;
    }
}
