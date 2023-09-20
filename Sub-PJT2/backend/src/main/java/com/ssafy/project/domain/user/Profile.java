package com.ssafy.project.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.project.domain.BaseTimeEntity;
import com.ssafy.project.dto.request.ProfileReqDto;
import com.ssafy.project.dto.request.UserProfileReqDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Profile extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="profile_id")
    private Long id;

    @JsonBackReference
    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

//    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
//    private List<Image> profileImages = new ArrayList<>();

    @Column(nullable = false)
    private String userSido;

    @Column(nullable = false)
    private String userGugun;

    @Column(nullable = false)
    private String userJob;

    @Column(nullable = false)
    private String userHobby;

    @Column(nullable = false)
    private String userMbti;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Builder
    public Profile(User user, List<Image> profileImages, String userSido, String userGugun, String userJob, String userHobby, String userMbti, String content) {
        this.user = user;
        this.userSido = userSido;
        this.userGugun = userGugun;
        this.userJob = userJob;
        this.userHobby = userHobby;
        this.userMbti = userMbti;
        this.content = content;
//        this.profileImages = new ArrayList<>();
//        profileImages.forEach(this::addImage);
    }

    public void updateProfile(ProfileReqDto profileReqDto) {
        this.userSido = profileReqDto.getUserSido();
        this.userGugun = profileReqDto.getUserGugun();
        this.userJob = profileReqDto.getUserJob();
        this.userHobby = profileReqDto.getUserHobby();
        this.userMbti = profileReqDto.getUserMbti();
        this.content = profileReqDto.getContent();
    }

    public void updateProfile(UserProfileReqDto userProfileReqDto) {
        this.userSido = userProfileReqDto.getUserSido();
        this.userGugun = userProfileReqDto.getUserGugun();
        this.userJob = userProfileReqDto.getUserJob();
        this.userMbti = userProfileReqDto.getUserMbti();
    }


    public void addHobby(String hobby) {
        if(this.userHobby == null) this.userHobby = hobby+"/";
        else this.userHobby += hobby+"/";
    }

    public void deleteHobby(String hobby) {
        if(this.userHobby != null) {
            this.userHobby = this.userHobby.replace(hobby+"/", "");
        }
    }
}
