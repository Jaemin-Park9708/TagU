package com.ssafy.project.repository;

import com.ssafy.project.domain.group.GameStatus;
import com.ssafy.project.domain.room.MeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameStatusRepository extends JpaRepository<GameStatus, Long> {

    Optional<GameStatus> findByMeetingRoom(MeetingRoom meetingRoom);
}
