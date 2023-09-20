package com.ssafy.project.dto.response;

import com.querydsl.core.Tuple;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.friend.FriendShip;
import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "친구 상세 Response DTO")
public class FriendInfoRspDto {
    @Schema(description = "타겟 유저 아이디")
    private Long targetId;
    @Schema(description = "타겟 유저 이름")
    private String targetName;
    @Schema(description = "타겟 유저 나이")
    private int userAge;
    @Schema(description = "타겟 유저 성별")
    private Gender userGender;
    @Schema(description = "타겟 유저 상태 메시지")
    private String targetContent;
    @Schema(description = "타겟 유저 이미지 url")
    private String targetImageUrl;
    @Schema(description = "친구 상태")
    private FriendShipStatus friendShipStatus;
}
