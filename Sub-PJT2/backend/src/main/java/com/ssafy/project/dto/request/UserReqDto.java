package com.ssafy.project.dto.request;

import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "유저 관련 Request DTO")
public class UserReqDto {
    @Schema(description = "유저 아이디")
    private Long uId;
    @Schema(description = "유저 이메일")
    private String email;
    @Schema(description = "유저 이름")
    private String name;
//    private String picture;

    public User toEntity() {
        return User.builder()
                .userEmail(email)
                .userName(name)
                .build();
    }

}
