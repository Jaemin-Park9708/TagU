package com.ssafy.project.controller;

import com.ssafy.project.attribute.StompHandler;
import com.ssafy.project.domain.constants.AuthConstants;
import com.ssafy.project.dto.request.RoomMessageReqDto;
import com.ssafy.project.dto.response.RoomMessageRspDto;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.redis.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "채팅", description = "chat message 테이블 관련 API")
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final TokenService tokenService;
    private final ChatService chatService;

    // ====================== 메시지 발행 ============================
    /**
     * @MessageMapping 을 통해 WebSocket 으로 들어오는 메시지를 발행
     * Client 에서는 prefix 를 붙여서 /pub/chat/message 로 발행 요청을 보내면 해당 메시지 처리
     */
    @MessageMapping("/chat/message")
    @Operation(summary = "메시지 보내기", description = "")
    public void sendMessage(Message<?> header, RoomMessageReqDto message) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(header);
        System.out.println("열로 메시지가 와야됨");
        Long userId = tokenService.parseUId(accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER));
        log.info("발행 시작은 되는 건가요?");
        String topic = message.getMeetingRoomId().toString();
        redisPublisher.publish(ChannelTopic.of(topic), userId, message);
    }

    // ====================== 채팅 메시지 가져오기 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/chat/rooms/{meetingRoomId}/messages")
    @Operation(summary = "미팅방 메시지 가져오기", description = "")
    public List<RoomMessageRspDto> getChatMessages(@PathVariable("meetingRoomId") Long meetingRoomId) {
        return chatService.getChatMessages(meetingRoomId);
    }

}
