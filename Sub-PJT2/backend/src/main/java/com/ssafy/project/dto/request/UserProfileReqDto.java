package com.ssafy.project.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "프로필 Request DTO")
public class UserProfileReqDto {
    @Schema(description = "이름")
    private String userName;
    @Schema(description = "시/도")
    private String userSido;
    @Schema(description = "구/군")
    private String userGugun;
    @Schema(description = "직업")
    private String userJob;
    @Schema(description = "mbti")
    private String userMbti;

}
