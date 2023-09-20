package com.ssafy.project.dto.response;

import com.ssafy.project.domain.room.OneMeetingRoom;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(description = "1:1 방 Response DTO")
public class OneRoomRspDto {
    @Schema(description = "방 아이디")
    private Long roomId;
    @Schema(description = "방 타입")
    private String roomType;
    @Schema(description = "세션 아이디")
    private String sessionId;
    @Schema(description = "방 내의 참가자 목록")
    private List<String> userList;

    public OneRoomRspDto(OneMeetingRoom meetingRoom) {
        this.roomId = meetingRoom.getId();
        this.roomType = "One";
        this.sessionId = meetingRoom.getSessionId();
        this.userList = meetingRoom.getUserList().stream().map(user -> user.getUserName()).toList();
    }

}
