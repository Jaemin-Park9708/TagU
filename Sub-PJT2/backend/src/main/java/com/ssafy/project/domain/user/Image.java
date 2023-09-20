package com.ssafy.project.domain.user;

import com.ssafy.project.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Image extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private Profile profile;

    @Column(nullable = false)
    private String origFileName;  // 파일 원본명

    @Column(nullable = false)
    private String filePath;  // 파일 저장 경로

    private Long fileSize;

    @Builder
    public Image(String origFileName, String filePath, Long fileSize) {
        this.origFileName = origFileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    // 대표 이미지

    public void editImg(String filePath, Long fileSize) {
        this.filePath = filePath;
        this.fileSize = fileSize;
    }
    public void editImg(Profile profile, String filePath, Long fileSize) {
        this.profile = profile;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    // profile 정보
//    public void setProfile(Profile profile){
//        this.profile = profile;
//
//        // 이미지 목록에 없을 시 추가
//        if(!profile.getProfileImages().contains(this))
//            profile.getProfileImages().add(this);
//    }
}


