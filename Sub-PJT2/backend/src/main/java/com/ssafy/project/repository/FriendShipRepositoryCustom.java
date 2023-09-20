package com.ssafy.project.repository;

import com.ssafy.project.dto.response.FriendInfoRspDto;

import java.util.List;
import java.util.Optional;

public interface FriendShipRepositoryCustom {
    Optional<List<FriendInfoRspDto>> findFriendInfoAllByUserId(Long userId);
}
