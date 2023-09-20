package com.ssafy.project.repository;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;

import java.util.Optional;

public interface GroupRoomRepositoryCustom {
    Optional<GroupMeetingRoom> findRandomGroupRoom(MeetingGroup group) ;
}
