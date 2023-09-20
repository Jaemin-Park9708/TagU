package com.ssafy.project.dto.response;

import com.ssafy.project.domain.group.GroupRole;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "유저 방 Response DTO")
public class UserGroupDto {
    @Schema(description = "방장 이름")
    private String userName;
    @Schema(description = "방장 이미지 url")
    private String ImageUrl;
    @Schema(description = "그룹 아이디")
    private int groupIdx;
//    private GroupRole groupRole;

    public UserGroupDto(User user, int idx) {
        this.userName = user.getUserName();
        this.ImageUrl = user.getMainImage().getFilePath();
        this.groupIdx = idx;
    }

//    public void setRole(GroupRole groupRole){
//        this.groupRole = groupRole;
//    }
}
