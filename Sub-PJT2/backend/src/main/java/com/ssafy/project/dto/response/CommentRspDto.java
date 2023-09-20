package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.Comment;
import com.ssafy.project.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentRspDto {
    private Long commentId;
    private String userName;
    private Long profileId;
    private String title;
    private String content;

    public CommentRspDto(Comment comment) {
        this.commentId = comment.getId();
        this.userName = comment.getUser().getUserName();
        this.profileId = comment.getProfile().getId();
        this.title = comment.getTitle();
        this.content = comment.getContent();
    }

}
