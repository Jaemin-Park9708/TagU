package com.ssafy.project.dto.response;

import com.ssafy.project.dto.request.UserProfileReqDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "유저 프로필 Response DTO")
public class UserProfileRspDto {
    @Schema(description = "유저 이름")
    private String userName;
    @Schema(description = "유저 거주지 - 시/도")
    private String userSido;
    @Schema(description = "유저 거주지 - 구/군")
    private String userGugun;
    @Schema(description = "유저 직업")
    private String userJob;
    @Schema(description = "유저 mbti")
    private String userMbti;

    public UserProfileRspDto(UserProfileReqDto userProfileReqDto){
        this.userName = userProfileReqDto.getUserName();
        this.userSido = userProfileReqDto.getUserSido();
        this.userGugun = userProfileReqDto.getUserGugun();
        this.userJob = userProfileReqDto.getUserJob();
        this.userMbti = userProfileReqDto.getUserMbti();
    }
}
