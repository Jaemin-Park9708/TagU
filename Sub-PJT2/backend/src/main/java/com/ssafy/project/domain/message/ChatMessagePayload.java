package com.ssafy.project.domain.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ChatMessagePayload {

    @NotBlank
    @JsonProperty(value = "content")
    private String content;

    @NotBlank
    @JsonProperty(value = "sender")
    private String sender;

    @NotBlank
    @JsonProperty(value = "message_type")
    private MessageType messageType;

    @NotNull
    @JsonProperty(value = "meeting_room_id")
    private Long meetingRoomId;

//    @Builder
//    public ChatMessagePayload(ChatMessage message){
//        this.content = message.getContent();
//        this.sender = message.getSender().getUserName();
//        this.messageType = getMessageType();
//        this.meetingRoomId = message.getMeetingRoom().getId();
//    }

}
