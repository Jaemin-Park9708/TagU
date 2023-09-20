package com.ssafy.project.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "토큰 DTO")
public class Token {
    private String token;
    private String refreshToken;
}
