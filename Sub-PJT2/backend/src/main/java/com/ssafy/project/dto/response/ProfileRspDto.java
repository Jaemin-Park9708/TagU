package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.Profile;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "프로필 Response DTO")
public class ProfileRspDto {
    @Schema(description = "유저 이름")
    private String userName;
    @Schema(description = "유저 거주지 - 시/도")
    private String userSido;
    @Schema(description = "유저 거주지 - 구/군")
    private String userGugun;
    @Schema(description = "유저 직업")
    private String userJob;
    @Schema(description = "유저 취미")
    private String userHobby;
    @Schema(description = "유저 mbti")
    private String userMbti;
    @Schema(description = "한 마디")
    private String content;

    public ProfileRspDto(Profile profile) {
        this.userName = profile.getUser().getUserName();
        this.userSido = profile.getUserSido();
        this.userGugun = profile.getUserGugun();
        this.userJob = profile.getUserJob();
        this.userHobby = profile.getUserHobby();
        this.userMbti = profile.getUserMbti();
        this.content = profile.getContent();
    }
}
