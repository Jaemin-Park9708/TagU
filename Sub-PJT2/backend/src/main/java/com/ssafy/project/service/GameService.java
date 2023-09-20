package com.ssafy.project.service;

import com.ssafy.project.domain.group.GameStatus;
import com.ssafy.project.domain.room.MeetingRoom;
import com.ssafy.project.dto.response.GameRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.GameStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {

    private final GameStatusRepository gameStatusRepository;
    private final RoomService roomService;

    public GameRspDto makeGame(Long roomId) throws IllegalAccessException {
        MeetingRoom meetingRoom = roomService.findGroupMeetRoom(roomId)
                .orElse(null);
        if(meetingRoom == null)
            meetingRoom = roomService.findOneMeetRoom(roomId)
                .orElseThrow(() -> new NotFoundException("룸아이디에 해당하는 룸 없음"));

        if(meetingRoom.getStatus().equals("INACTIVE"))
            throw new IllegalAccessException("아직 시작안한 방");

        saveGameStatus(GameStatus.builder()
                .meetingRoom(meetingRoom)
                .build());
        return new GameRspDto(
                findGameStatusByMeetingRoom(meetingRoom)
                        .orElseThrow(() -> new NotFoundException("해당 게임 없음"))
        );
    }

    public GameRspDto readyGame(Long gameId, int play) {
        GameStatus game = findGameStatusById(gameId)
                .orElseThrow(() -> new NotFoundException("해당 게임 없음"));
        if(play == 1) game.accept();
        else game.reject();
        return new GameRspDto(game);
    }



    private Optional<GameStatus> saveGameStatus(GameStatus gameStatus) {
        return Optional.of(gameStatusRepository.save(gameStatus));
    }

    private Optional<GameStatus> findGameStatusByMeetingRoom(MeetingRoom meetingRoom) {
        return gameStatusRepository.findByMeetingRoom(meetingRoom);
    }

    private Optional<GameStatus> findGameStatusById(Long gameId) {
        return gameStatusRepository.findById(gameId);
    }

}
