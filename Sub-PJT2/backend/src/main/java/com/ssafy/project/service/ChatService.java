package com.ssafy.project.service;

import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import com.ssafy.project.dto.request.RoomMessageReqDto;
import com.ssafy.project.dto.response.RoomMessageRspDto;
import com.ssafy.project.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import com.ssafy.project.service.redis.RedisSubscriber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final RedisSubscriber redisSubscriber;  // 구독 처리 서비스
    private final RedisMessageListenerContainer redisMessageListenerContainer;  // 채팅방(Topic)에 발행되는 메시지를 처리할 Listener(Subscriber)
    private final ChatMessageRepository chatMessageRepository;


    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    /**
     * Redis 에 Topic 을 만들고 pub/sub 통신을 하기 위해 Listener 를 설정
     */
    public void enterMeetRoom(Long id) {
        log.info("안녕하세요");
        ChannelTopic topic = topics.get(id);
        if (topic == null) {
            log.info("채팅방 접속됐나?");
            topic = new ChannelTopic(id.toString());
            redisMessageListenerContainer.addMessageListener(redisSubscriber, topic);
            topics.put(id.toString(), topic);
            log.info("여기까진 제대로 됨");
        }
    }

    /**
     * 해당 방의 전체 채팅 리스트를 가져옵니다.
     */
    public List<RoomMessageRspDto> getChatMessages(Long roomId) {
//        return chatMessageRepository.findAllByMeetingRoomId(roomId).orElseGet(() -> null)
//                .stream().map(RoomMessageReqDto::new).toList();
        List<RoomMessageRspDto> allMessages = new ArrayList<RoomMessageRspDto>(chatMessageRepository.findAllByMeetingRoomIdAndMessageType(roomId, MessageType.TALK).orElseGet(() -> null)
                .stream().map(RoomMessageRspDto::new).toList());
//        List<RoomMessageRspDto> result = new ArrayList<RoomMessageRspDto>();
//        for(int i = 0; i< allMessages.size(); i++){
//            if(allMessages.get(i).getMessageType() == MessageType.TALK){
//                result.add(allMessages.get(i));
//            }
//        }
        return allMessages;
    }

    public ChatMessage getEnterMessages(Long roomId) {
        log.info("왜 안됨?");
        return chatMessageRepository.findByMeetingRoomIdAndMessageType(roomId, MessageType.ENTER).orElseGet(null);
    }
}
