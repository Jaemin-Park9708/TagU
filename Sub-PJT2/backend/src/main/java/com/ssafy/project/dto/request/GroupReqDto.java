package com.ssafy.project.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "그룹 Request DTO")
public class GroupReqDto {
    @Schema(description = "그룹 아이디")
    private Long groupId;
    @Schema(description = "타켓 유저 아이디")
    private Long targetUserId;
}
