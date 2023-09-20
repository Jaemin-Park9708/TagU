package com.ssafy.project.repository;

import com.ssafy.project.domain.room.OneMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OneRoomRepository extends JpaRepository<OneMeetingRoom, Long>, OneRoomRepositoryCustom{
}