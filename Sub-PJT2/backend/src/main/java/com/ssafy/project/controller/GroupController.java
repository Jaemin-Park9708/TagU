package com.ssafy.project.controller;

import com.ssafy.project.dto.request.GroupReqDto;
import com.ssafy.project.dto.response.GroupRspDto;
import com.ssafy.project.service.GroupService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/groups", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
@Tag(name = "그룹", description = "meeting group 관련 API")
public class GroupController {

    private final GroupService groupService;
    private final TokenService tokenService;


    // ====================== 그룹 조회 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/own")
    @Operation(summary = "현재 유저 그룹 갖고오기", description = "")
    public GroupRspDto getGroup(HttpServletRequest request){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.getGroup(userId);
    }


    // ====================== 그룹 생성 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    @Operation(summary = "그룹 생성하기", description = "")
    public GroupRspDto createGroup(HttpServletRequest request){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.createGroup(userId);
    }

    // ====================== 그룹 요청 리스트 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/invited")
    @Operation(summary = "날 초대한 정보 - 방장 정보", description = "")
    public List<GroupRspDto> getInvitation(HttpServletRequest request) {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.getPendingList(uId);
    }


    // ====================== 그룹 초대 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    @Operation(summary = "그룹으로 초대하기", description = "")
    public GroupRspDto inviteGroup(HttpServletRequest request, @RequestBody GroupReqDto groupReqDto){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.inviteGroup(userId, groupReqDto);
    }

    // ====================== 그룹 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    @Operation(summary = "그룹 초대 수락하기", description = "")
    public GroupRspDto acceptGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.acceptGroup(userId, groupId);
    }

    // ====================== 그룹 거절 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/reject")
    @Operation(summary = "그룹 초대 거절하기", description = "")
    public GroupRspDto rejectGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.rejectGroup(userId, groupId);
    }

    // ====================== 그룹 탈퇴 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/quit")
    @Operation(summary = "그룹에서 나가기", description = "")
    public GroupRspDto quitGroup(HttpServletRequest request, @RequestParam Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.LeaveGroup(userId, groupId);
    }

    // ====================== 그룹 삭제 ============================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{groupId}")
    @Operation(summary = "그룹 삭제하기", description = "")
    public GroupRspDto removeGroup(HttpServletRequest request, @PathVariable Long groupId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return groupService.removeGroup(userId, groupId);
    }


}
