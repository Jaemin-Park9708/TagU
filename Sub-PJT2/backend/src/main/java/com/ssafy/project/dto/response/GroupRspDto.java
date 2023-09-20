package com.ssafy.project.dto.response;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Schema(description = "그룹 Response DTO")
public class GroupRspDto {

    @Schema(description = "그룹 아이디")
    private Long groupId;
    @Schema(description = "그룹 성별")
    private Gender groupGender;
    @Schema(description = "그룹 내의 유저 목록")
    private List<UserGroupDto> groupUser = new LinkedList<>();

    public GroupRspDto(MeetingGroup group) {
        this.groupId = group.getId();
        this.groupGender = group.getGroupGender();
        this.groupUser = group.getGroupUser().stream()
                .filter(user -> user != null)
                .map(user -> new UserGroupDto(user, group.getGroupUser().indexOf(user)))
                .collect(Collectors.toList());
    }

}
