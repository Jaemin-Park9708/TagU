package com.ssafy.project.controller;

import com.ssafy.project.dto.response.GroupRoomRspDto;
import com.ssafy.project.dto.response.OneRoomRspDto;
import com.ssafy.project.service.ChatService;
import com.ssafy.project.service.RoomService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/rooms", produces = "application/json; charset=utf8")
@Tag(name = "방 room", description = "meeting room 관련 API")
public class RoomController {

    private final TokenService tokenService;
    private final RoomService roomService;
    private final ChatService chatService;

    // ====================== 미팅방 조회 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/one/{roomId}")
    @Operation(summary = "roomId로 일대일 방 가져오기", description = "")
    public OneRoomRspDto getOneTemp(@PathVariable Long roomId) {
        return roomService.getOneRoom(roomId);
    }

    // ====================== 미팅방 조회 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/group/{roomId}")
    @Operation(summary = "roomId로 다대다 방 가져오기", description = "")
    public GroupRoomRspDto getGroupTemp(@PathVariable Long roomId) {
        return roomService.getGroupRoom(roomId);
    }

    // ====================== 일대일 미팅방 생성 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/one")
    @Operation(summary = "1:1 대기방 생성하기", description = "")
    public OneRoomRspDto enterOneMeetRoom(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.enterOneMeetRoom(userId);
    }

    // ====================== 일대일 대기방 나가기 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/one/quit")
    @Operation(summary = "1:1 대기방 나가기", description = "")
    public OneRoomRspDto cancelOneMeetRoom(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.cancelOneMeetRoom(userId);
    }

    // ====================== 일대일 미팅방 시작 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/one/{roomId}")
    @Operation(summary = "1:1 미팅 시작하기", description = "")
    public OneRoomRspDto startOneMeetRoom(@PathVariable Long roomId) {
        return roomService.startOneMeetRoom(roomId);
    }

    // ====================== 일대일 미팅방 나가기 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/one/quit/{roomId}")
    @Operation(summary = "1:1 진행 중 미팅방 나가기", description = "")
    public OneRoomRspDto quitOneMeetRoom(HttpServletRequest request, @PathVariable Long roomId) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.quitOneMeetRoom(userId, roomId);
    }

    // ====================== 일대일 미팅방 종료 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(path = "/one/{roomId}")
    @Operation(summary = "1:1 미팅 끝내기", description = "")
    public OneRoomRspDto endOneMeetRoom(@PathVariable Long roomId) {
        return roomService.endOneMeetRoom(roomId);
    }


    // ====================== 다대다 미팅방 생성 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/group")
    @Operation(summary = "3:3 대기방 생성하기", description = "그룹 생성이 선행되어야 대기방 생성이 가능함")
    public GroupRoomRspDto createGroupMeetRoom(HttpServletRequest request, @RequestParam Long groupId) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.enterGroupMeetRoom(userId, groupId);
    }

    // ====================== 다대다 대기방 나가기 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/group/quit")
    @Operation(summary = "3:3 대기방 나가기", description = "")
    public GroupRoomRspDto cancelGroupMeetRoom(HttpServletRequest request,@RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.cancelGroupMeetRoom(userId, groupId);
    }

    // ====================== 다대다 미팅방 시작 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/group/{roomId}")
    @Operation(summary = "3:3 미팅 시작하기", description = "")
    public GroupRoomRspDto startGroupMeetRoom(@PathVariable Long roomId) {
        return roomService.startGroupMeetRoom(roomId);
    }

    // ====================== 다대다 미팅방 나가기 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/group/quit/{roomId}")
    @Operation(summary = "3:3 진행 중 미팅방 나가기", description = "")
    public GroupRoomRspDto quitGroupMeetRoom(HttpServletRequest request,@RequestParam Long roomId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return roomService.quitGroupMeetRoom(userId, roomId);
    }


    // ====================== 다대다 미팅방 종료 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/group/{roomId}")
    @Operation(summary = "3:3 미팅 끝내기", description = "")
    public GroupRoomRspDto endGroupMeetRoom(@PathVariable Long roomId) {
        return roomService.endGroupMeetRoom(roomId);
    }

}
