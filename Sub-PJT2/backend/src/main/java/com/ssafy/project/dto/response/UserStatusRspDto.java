package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.UserStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "유저 접속 상태 Response DTO")
public class UserStatusRspDto {
    @Schema(description = "유저 접속 상태")
    private UserStatus userStatus;

    public UserStatusRspDto(UserStatus status){
        this.userStatus = status;
    }
}
