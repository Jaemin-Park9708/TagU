package com.ssafy.project.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "취미 Response DTO")
public class HobbyRspDto {
    @Schema(description = "취미")
    private String hobby;
    public HobbyRspDto(String hobby) {
        this.hobby = hobby;
    }
}
