package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "유저 정보 Response DTO")
public class UserInfoRspDto {
    @Schema(description = "유저 이메일")
    private String userEmail;
    @Schema(description = "유저 이름")
    private String userName;
    @Schema(description = "유저 전화번호")
    private String phoneNumber;
    @Schema(description = "유저 나이")
    private int userAge;
    @Schema(description = "유저 성별")
    private Gender userGender;
    @Schema(description = "유저 좋아요 수")
    private int userLike;

    public UserInfoRspDto(User user) {
        this.userEmail = user.getUserEmail();
        this.userName = user.getUserName();
        this.phoneNumber = user.getPhoneNumber();
        this.userAge = user.getUserAge();
        this.userGender = user.getUserGender();
        this.userLike = user.getUserLike();
    }
}
