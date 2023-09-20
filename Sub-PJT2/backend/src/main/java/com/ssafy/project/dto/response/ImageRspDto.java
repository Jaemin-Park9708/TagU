package com.ssafy.project.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "이미지 Response DTO")
public class ImageRspDto {
    @Schema(description = "이미지 url")
    private String imageUrl;

    public ImageRspDto(String url){
        this.imageUrl = url;
    }
}
