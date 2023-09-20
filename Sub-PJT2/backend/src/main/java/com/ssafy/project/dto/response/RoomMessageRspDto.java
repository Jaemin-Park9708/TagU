package com.ssafy.project.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "룸 메시지 Response DTO")
public class RoomMessageRspDto {
    @Schema(description = "보낸 사람")
    private String sender;

    @Schema(description = "내용")
    private String content;

    @JsonProperty(value = "message_type")
    @Schema(description = "메시지 타입 - 들어옴, 나감, 채팅")
    private MessageType messageType;

    @JsonProperty(value = "meeting_room_id")
    @Schema(description = "미팅방 아이디")
    private Long meetingRoomId;

    public RoomMessageRspDto(ChatMessage message){
        this.sender = message.getSender().getUserName();
//        this.sender = message.getSender().getId();
        this.content = message.getContent();
        this.messageType = message.getMessageType();
        this.meetingRoomId = message.getMeetingRoom().getId();
    }
}
