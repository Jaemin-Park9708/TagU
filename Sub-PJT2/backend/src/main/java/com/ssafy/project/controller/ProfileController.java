package com.ssafy.project.controller;

import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.dto.request.HobbyReqDto;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.dto.request.UserProfileReqDto;
import com.ssafy.project.dto.response.HobbyRspDto;
import com.ssafy.project.dto.response.ImageRspDto;
import com.ssafy.project.dto.response.ProfileRspDto;
import com.ssafy.project.dto.response.UserProfileRspDto;
import com.ssafy.project.service.ProfileService;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/profile", produces = "application/json; charset=utf8")
@Tag(name = "프로필", description = "프로필 테이블 관련 API")
public class ProfileController {

    private final TokenService tokenService;
    private final ProfileService profileService;
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("")
    @Operation(summary = "본인 프로필 가져오기", description = "")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.getProfileByUId(userId);
        return ResponseEntity.ok().body(new ProfileRspDto(profile));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    @Operation(summary = "다른 사람의 프로필 가져오기", description = "{userId} -> 다른사람의 유저 아이디")
    public ProfileRspDto getFriendProfile(HttpServletRequest request, @PathVariable Long userId) {
        Profile profile = profileService.getProfileByUId(userId);
        return new ProfileRspDto(profile);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("")
    @Operation(summary = "프로필 만들기", description = "첫 로그인하는 경우 이 api로 프로필을 만들어줘야 함")
    public ProfileRspDto makeProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.makeProfile(userId, profileReqDto);
        return new ProfileRspDto(profile);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image")
    @Operation(summary = "본인 프로필 이미지들 가져오기", description = "")
    public List<ImageRspDto> getProfileImages(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.getProfileImages(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/image/{uId}")
    @Operation(summary = "다른 사람의 프로필 이미지들 가져오기", description = "{uId} -> 다른사람의 유저 아이디")
    public List<ImageRspDto> getFriendsProfileImages(@PathVariable Long uId) {
        return profileService.getProfileImages(uId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("")
    @Operation(summary = "프로필 변경하기", description = "시도, 구군, 직업, 취미, mbti, 한마디 변경")
    public ProfileRspDto editProfile(HttpServletRequest request, @RequestBody ProfileReqDto profileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        Profile profile = profileService.editProfile(userId, profileReqDto);
        return new ProfileRspDto(profile);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/name")
    @Operation(summary = "본인 이름이랑 프로필 일부 변경", description = "이름, 시도, 구군, 직업, mbti 변경")
    public UserProfileRspDto editNameProfile(HttpServletRequest request, @RequestBody UserProfileReqDto userProfileReqDto) {
        Long userId = tokenService.parseUId(request.getHeader("Auth"));
        profileService.editProfile(userId, userProfileReqDto);
        userService.editUserName(userId, userProfileReqDto);
        return new UserProfileRspDto(userProfileReqDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/image")
    @Operation(summary = "프로필에 이미지 등록하기", description = "")
    public ImageRspDto uploadProfileImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) throws IOException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.saveProfileImage(id, file);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/image/{imgId}")
    @Operation(summary = "프로필의 특정 이미지 삭제하기", description = "{imgId} -> 삭제할 이미지 아이디")
    public String deleteProfileImage(HttpServletRequest request, @PathVariable Long imgId) throws IllegalAccessException {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        profileService.deleteProfileImage(id, imgId);
        return "deleted";
    }

    // ========================== 취미 ====================================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/hobby")
    @Operation(summary = "본인 취미 가져오기", description = "")
//    public List<HobbyRspDto> getHobby(HttpServletRequest request) {
    public HobbyRspDto getHobby(HttpServletRequest request) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.getHobby(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/hobby/{uId}")
    @Operation(summary = "다른 사람 취미 가져오기", description = "{uId} -> 다른 사람의 유저 아이디")
    public HobbyRspDto getFriendsHobby(@PathVariable Long uId) {
        return profileService.getHobby(uId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/hobby")
    @Operation(summary = "취미 등록(추가)하기", description = "")
    public HobbyRspDto addHobby(HttpServletRequest request, @RequestBody HobbyReqDto hobbyReqDto) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.addHobby(id, hobbyReqDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/hobby")
    @Operation(summary = "취미 삭제하기", description = "삭제할 취미를 requestBody에 넣어서 보내야 함")
    public HobbyRspDto deleteHobby(HttpServletRequest request, @RequestBody HobbyReqDto hobbyReqDto) {
        Long id = tokenService.parseUId(request.getHeader("Auth"));
        return profileService.deleteHobby(id, hobbyReqDto);
    }



}
