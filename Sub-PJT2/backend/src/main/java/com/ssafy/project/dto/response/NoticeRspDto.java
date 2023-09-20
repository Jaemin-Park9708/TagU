package com.ssafy.project.dto.response;

import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.domain.notice.NoticeType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Schema(description = "공지 Response DTO")
public class NoticeRspDto {
    @Schema(description = "공지 아이디")
    private Long noticeId;
    @Schema(description = "공지 종류")
    private NoticeType noticeType;
    @Schema(description = "내용")
    private String content;
    @Schema(description = "생성된 시간")
    private LocalDateTime createDate;
    @Schema(description = "읽음 여부")
    private boolean read;

    public NoticeRspDto(Notice notice) {
        this.noticeId = notice.getId();
        this.noticeType = notice.getType();
        this.content = notice.getContent();
        this.createDate = notice.getCreatedDate();
        this.read = notice.isRead();
    }

}







