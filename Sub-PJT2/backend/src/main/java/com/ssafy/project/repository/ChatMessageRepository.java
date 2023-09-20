package com.ssafy.project.repository;

import com.ssafy.project.domain.message.ChatMessage;
import com.ssafy.project.domain.message.MessageType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    Optional<List<ChatMessage>> findAllByMeetingRoomIdAndMessageType(Long id, MessageType type);

    Optional<ChatMessage> findByMeetingRoomIdAndMessageType(Long id, MessageType type);
}
