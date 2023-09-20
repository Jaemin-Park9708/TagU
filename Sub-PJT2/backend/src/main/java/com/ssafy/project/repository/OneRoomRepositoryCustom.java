package com.ssafy.project.repository;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.user.User;

import java.util.Optional;

public interface OneRoomRepositoryCustom {
    Optional<OneMeetingRoom> findRamdomOneRoom(User user);
}
