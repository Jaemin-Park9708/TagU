package com.ssafy.project.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "댓글 Request DTO")
public class CommentReqDto {
    @Schema(description = "댓글 제목")
    private String title;
    @Schema(description = "댓글 내용")
    private String content;
}
