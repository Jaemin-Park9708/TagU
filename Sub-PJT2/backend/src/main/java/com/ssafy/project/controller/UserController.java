package com.ssafy.project.controller;

import com.ssafy.project.domain.user.UserStatus;
import com.ssafy.project.dto.request.UserInfoReqDto;
import com.ssafy.project.dto.response.ImageRspDto;
import com.ssafy.project.dto.response.UserInfoRspDto;
import com.ssafy.project.dto.response.UserStatusRspDto;
import com.ssafy.project.service.OnlineService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = "application/json; charset=utf8")
@Tag(name = "유저", description = "유저 테이블 관련 API")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;
    private final OnlineService onlineService;

    // ====================== 임시 토큰 ============================

    @GetMapping("/tmp/token")
    @Operation(summary = "임시 토큰 발급", description = "api 테스트 용 임시 토큰 발급")
    public String tmpTokenGenerate(HttpServletRequest request) {
        String id = request.getHeader("userId");
        return tokenService.makeTmpToken(id);
//        return tokenService.generateToken(id, "USER").getToken();
    }

    // ====================== 첫 로그인 여부 ============================
//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/first")
//    public FirstLoginRspDto firstLogin(HttpServletRequest request) {
//        return userService.hasDetailInfo(tokenService.parseUId(request.getHeader("Auth")));
//    }

    @GetMapping("/first")
    @Operation(summary = "첫 로그인 판별", description = "로그인한 유저가 추가정보를 입력할 필요 여부 확인 (notFound: 필요함 / ok: 필요없음)")
    public ResponseEntity firstLogin(HttpServletRequest request) {
        if(userService.hasDetailInfo(tokenService.parseUId(request.getHeader("Auth"))))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build();
    }


    // ====================== 마이페이지 ============================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/mypage") // 마이페이지(users 테이블) 정보 받아오기
    @Operation(summary = "마이페이지(users 테이블) 받아오기", description = "")
    public UserInfoRspDto getMypage(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.getUserInfo(id);
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/mypage/{uId}") // 마이페이지(users 테이블) 정보 받아오기
    @Operation(summary = "다른 사람의 마이페이지(users 테이블) 가져오기", description = "{uId} -> 다른 사람의 유저 아이디")
    public UserInfoRspDto getFriendPage(@PathVariable String uId) {
        Long id = Long.parseLong(uId);
        return userService.getUserInfo(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image")
    @Operation(summary = "본인 유저 이미지 가져오기", description = "기본값은 카톡 프사")
    public ImageRspDto getMyImage(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.getUserImage(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image/{uId}")
    @Operation(summary = "다른사람의 유저 이미지 가져오기", description = "{uId} -> 다른 사람의 유저 아이디")
    public ImageRspDto getImage(@PathVariable Long uId) {
        return userService.getUserImage(uId);
    }


    // ==================== 회원 상세 정보 입력 ============================
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/mypage") // 첫 로그인 후 추가정보 넣기 or 마이페이지 정보 수정하기
    @Operation(summary = "마이페이지(users 테이블) 수정하기", description = "첫 로그인 후 추가 정보 넣을 때도 이 api 사용")
    public UserInfoRspDto editMypage(HttpServletRequest request, @RequestBody UserInfoReqDto userInfo) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.editUserInfo(id, userInfo);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/image")
    @Operation(summary = "내 유저 이미지 바꾸기", description = "")
    public ImageRspDto changeUserImg(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return userService.editUserImage(id, file);
    }

    // ========================== 유효성 검사 ====================================
    // 전화번호 길이 확인
    @GetMapping("/phone")
    @Operation(summary = "폰 번호 길이 유효성 검사", description = "000-0000-0000 -> 13자리 인지 아닌지")
    public ResponseEntity<?> checkPhoneNum(@RequestParam String phoneNum) {
        if(userService.chkPhoneNum(phoneNum))
            return ResponseEntity.ok().body("유효한 폰번호(13자리)");
        return ResponseEntity.badRequest().body("유효하지 않은 폰번호(13자리 아님)");
    }

    @PostMapping("/setUserStatus")
    public void SetUserStatus(HttpServletRequest request, @RequestBody String status){
        System.out.println("열로 들어오냐?");
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        System.out.println("상태: " + status);
        switch(status){
            case "ONLINE":
                onlineService.editUserStatus(id, UserStatus.ONLINE);
                break;
            case "OFFLINE":
                onlineService.editUserStatus(id, UserStatus.OFFLINE);
                break;
            case "INGAME":
                onlineService.editUserStatus(id, UserStatus.INGAME);
                break;
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/state/{uId}")
    public UserStatusRspDto getUserStatus(@PathVariable String uId){
        Long id = Long.parseLong(uId);
        log.info(">>>>>>>>>>>UserStaus : " + uId);
        return userService.getUserStatus(id);
    }

}
