package com.ssafy.project.controller;

import com.ssafy.project.dto.response.GameRspDto;
import com.ssafy.project.service.GameService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/game")
@Tag(name = "게임 관련", description = "")
public class GameController {

    private final TokenService tokenService;
    private final GameService gameService;

    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "게임 제안 api", description = "참여자 중 누군가 게임을 선택하면 실행")
    @PostMapping("/play")
    public GameRspDto offerGame(@RequestParam Long roomId) throws IllegalAccessException {
        return gameService.makeGame(roomId);
    }

    @Operation(summary = "제안된 게임 수락/거부", description = "play: 참여(1)/거부(0)")
    @PutMapping("/ready")
    public GameRspDto gameReady(@RequestParam Long gameId, @RequestParam int play) {
        return gameService.readyGame(gameId, play);
    }

}
