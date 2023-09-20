package com.ssafy.project.controller;

import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.dto.response.FriendInfoRspDto;
import com.ssafy.project.dto.response.FriendRspDto;
import com.ssafy.project.service.FriendShipService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/friends", produces = "application/json; charset=utf8")
@RequiredArgsConstructor
@Tag(name = "친구", description = "friend ship 관련 API")
public class FriendShipController {

    private final FriendShipService friendShipService;
    private final TokenService tokenService;

    // ====================== 친구 요청 ============================
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/request")
    @Operation(summary = "친구 신청하기", description = "")
    public FriendRspDto requestFriend(HttpServletRequest request,
                                      @RequestParam Long targetId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.requestFriendShip(userId, targetId);
    }

    // ====================== 요청 수락 ============================
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/accept")
    @Operation(summary = "친구 신청 수락하기", description = "")
    public FriendRspDto acceptFriend(HttpServletRequest request,
                                     @RequestParam Long targetId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.acceptFriendShip(userId, targetId);
    }

    // ====================== 친구 리스트 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/list") // none, block 빼고 다 가져오기
    @Operation(summary = "친구 리스트(친구, 신청한, 신청받은) 가져오기", description = "전체 리스트")
    public List<FriendInfoRspDto> friendsList(HttpServletRequest request){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.findFriendShips(userId);
    }

    // ====================== 친구 차단 ============================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/block")
    @Operation(summary = "친구 차단하기", description = "")
    public FriendRspDto blockFriend(HttpServletRequest request,
                                    @RequestParam Long friendId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.blockFriendShip(userId, friendId);
    }

    // ====================== 사용자 검색 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search")
    @Operation(summary = "유저 검색하기", description = "키워드 이용하여 해당 포함된 유저 리스트 반환")
    public List<FriendRspDto> findUsers(HttpServletRequest request,
                                        @RequestParam(required = false) String keyword){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        return friendShipService.findUsers(userId, keyword/*, status*/);
    }

    //  ====================== 친구요청 거절 ===========================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/reject")
    @Operation(summary = "친구 신청 거절하기", description = "")
    public String rejectFriendShip(HttpServletRequest request, @RequestParam Long otherId){
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        friendShipService.rejectFriendShip(userId, otherId);
        return "rejected";
    }

}
