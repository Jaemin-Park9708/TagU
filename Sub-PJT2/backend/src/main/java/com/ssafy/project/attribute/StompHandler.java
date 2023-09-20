package com.ssafy.project.attribute;

import com.ssafy.project.controller.ChatController;
import com.ssafy.project.domain.constants.AuthConstants;
import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.domain.user.UserStatus;
import com.ssafy.project.dto.request.RoomMessageReqDto;
import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.dto.response.RoomMessageRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.OneRoomRepository;
import com.ssafy.project.repository.UserRepository;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.OnlineService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import com.ssafy.project.service.redis.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final RedisPublisher redisPublisher;
    private final ChatService chatService;
    private final OnlineService onlineService;


    public StompHandler(TokenService tokenService, @Lazy ChatService chatService, @Lazy RedisPublisher redisPublisher, OnlineService onlineService) {
        this.tokenService = tokenService;
        this.chatService = chatService;
        this.redisPublisher = redisPublisher;
        this.onlineService = onlineService;
    }

    @Override // websocket을 통해 들어온 요청이 처리 되기 전 실행된다.
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("StompHandler로 들어오기는 한다!!");
        log.info("무슨 메시지?: " + accessor.getCommand());
        log.info("메시지 내용: " + accessor);
        log.info("메시지 헤더: " + accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER));
        log.info("사용자 접속정보: " + accessor.getFirstNativeHeader(AuthConstants.INFO));
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            log.info("StompHandler JWT : " + jwt);
            if (StringUtils.hasText(jwt)) {
                String accessToken = jwt;
                log.info("StompHandler AccessToken : " + accessToken);

                boolean validToken = false;
                try {
                    validToken = tokenService.verifyToken(accessToken);
                    System.out.println(validToken);
                } catch (IOException e) {
                    log.info("Exception occurred");
                    throw new RuntimeException(e);
                }
                log.info("ValidToken : " + validToken);

                Long uid = tokenService.parseUId(accessToken);
                String info = accessor.getFirstNativeHeader(AuthConstants.INFO);
                log.info("세션ID: " + accessor.getSessionId());
                if (!validToken) {
                    return null;
                } else {
                    System.out.println("이건 되겠지?");
                    System.out.println(accessor.getSessionId());
                    onlineService.setSessionId(uid, accessor.getSessionId());
                    onlineService.editUserStatus(uid, UserStatus.ONLINE);
                }
            }
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
//            String roomId = Optional.ofNullable((String) message.getHeaders().get("RoomId")).orElse("InvalidRoomId");
            String info = accessor.getFirstNativeHeader(AuthConstants.INFO);
            String roomId = Optional.ofNullable((String) accessor.getFirstNativeHeader(AuthConstants.ROOM_ID)).orElse("InvalidRoomId");
            log.info("roomId : " + roomId);

            String jwt = accessor.getFirstNativeHeader(AuthConstants.AUTHORIZATION_HEADER);
            String accessToken = jwt;
            Long uId = tokenService.parseUId(accessToken);
            Long rId = Long.parseLong(accessor.getFirstNativeHeader(AuthConstants.ROOM_ID));
            System.out.println("룸: " + rId);

            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            UserReqDto userReqDto = new UserReqDto(uId, "email", "이름");

            log.info("user : " + uId);
            log.info("userInfo : " + userReqDto.getEmail());
            chatService.enterMeetRoom(rId);
            log.info("채팅방 입장");

            redisPublisher.publish(ChannelTopic.of(roomId), uId, RoomMessageReqDto.builder().messageType(MessageType.ENTER).content("님께서 입장하셨습니다.").meetingRoomId(Long.parseLong(roomId)).build());
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            // 연결 종료
            log.info("연결종료");
            String sessionId = accessor.getSessionId();
            log.info("세션ID: " + sessionId);
            User u = onlineService.findUserBySessionId(sessionId).orElse(null);
            if (u != null) {
                onlineService.setSessionId(u.getId(), null);
                onlineService.editUserStatus(u.getId(), UserStatus.OFFLINE);
            }
        }
        return message;
    }

}