package com.ssafy.project.dto.request;

import com.ssafy.project.domain.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "유저 정보 수정용 Request DTO")
public class UserInfoReqDto {
    @Schema(description = "유저 전화번호")
    private String phoneNumber;

    @Schema(description = "유저 나이")
    private int userAge;

    @Schema(description = "유저 성별")
    private Gender userGender;
}
