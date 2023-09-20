package com.ssafy.project.domain.user;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.dto.request.CommentReqDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private Profile profile;

    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Builder
    public Comment(User user, Profile profile, String title, String content) {
        this.user = user;
        this.profile = profile;
        this.title = title;
        this.content = content;
    }

    public void updateComment(CommentReqDto commentReqDto){
        this.title = commentReqDto.getTitle();
        this.content = commentReqDto.getContent();
    }

}
