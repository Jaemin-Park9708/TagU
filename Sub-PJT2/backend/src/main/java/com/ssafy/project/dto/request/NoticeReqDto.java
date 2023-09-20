package com.ssafy.project.dto.request;

import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "공지 Request DTO")
public class NoticeReqDto {
    @Schema(description = "유저 아이디")
    private Long userId;
    @Schema(description = "공지 종류")
    private NoticeType noticeType;
    @Schema(description = "공지 내용")
    private String noticeContent;

    public Notice toEntity(User user){
        return Notice.builder()
                .user(user)
                .type(noticeType)
                .content(noticeContent)
                .build();
    }
}
