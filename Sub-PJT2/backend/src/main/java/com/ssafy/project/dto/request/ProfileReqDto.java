package com.ssafy.project.dto.request;

import com.ssafy.project.domain.user.Profile;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "프로필 Request DTO")
public class ProfileReqDto {
    //// 이미지 필요
    @Schema(description = "시/도")
    private String userSido;
    @Schema(description = "구/군")
    private String userGugun;
    @Schema(description = "직업")
    private String userJob;
    @Schema(description = "취미")
    private String userHobby;
    @Schema(description = "mbti")
    private String userMbti;
    @Schema(description = "한 마디")
    private String content;

}
