package com.ssafy.project.domain.notice;

import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "notices")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseTimeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "notice_type")
    private NoticeType type;

    @Column(nullable = false, name = "notice_content")
    private String content;

    @Column(nullable = false, name = "notice_read_status")
    private boolean read = false;

    @Column(nullable = false, name = "notice_valid_status")
    private boolean valid = true;

    @Builder
    public Notice(User user, NoticeType type, String content){
        this.user = user;
        this.type = type;
        this.content = content;
    }

    public boolean isValid() {
        return valid;
    }

    public void readNotice(){
        this.read = true;
    }

    public void notValidated(){
        this.valid = false;
    }

}
