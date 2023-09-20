package com.ssafy.project.repository;

import com.ssafy.project.domain.room.GroupMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRoomRepository extends JpaRepository<GroupMeetingRoom, Long>, GroupRoomRepositoryCustom{
}
