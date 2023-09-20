package com.ssafy.project.dto.response;

import com.ssafy.project.domain.group.GameStatus;
import lombok.Getter;

@Getter
public class GameRspDto {
    private Long gameId;
    private int ready;
    private int reject;

    public GameRspDto(GameStatus gameStatus) {
        this.gameId = gameStatus.getId();
        this.ready = gameStatus.getReadyNum();
        this.reject = gameStatus.getRejectNum();
    }
}
