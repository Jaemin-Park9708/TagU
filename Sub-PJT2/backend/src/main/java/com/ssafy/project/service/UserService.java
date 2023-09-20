package com.ssafy.project.service;

import com.ssafy.project.domain.user.Image;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.domain.user.UserStatus;
import com.ssafy.project.dto.request.UserProfileReqDto;
import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.dto.request.UserInfoReqDto;
import com.ssafy.project.dto.response.*;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ImageService imageService;

    /**
     * 회원 가입
     */
    @Transactional
    public void signUpUser(UserReqDto userReqDto) {
        findUserByEmail(
                userReqDto.getEmail()).ifPresent(
                        user -> { throw new IllegalStateException("이미 존재하는 회원입니다.");}
        );

        saveUser(new User(userReqDto.getEmail(), userReqDto.getName()))
                .orElseThrow(() -> new NotFoundException("유효하지 않은 유저입니다."));
    }
    /**
     * 회원 정보 수정
     */
    @Transactional
    public UserInfoRspDto editUserInfo(Long userId, UserInfoReqDto userInfo) {
        User user = findUser(userId).orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
        user.changeUser(userInfo);
        return new UserInfoRspDto(user);
    }

    public Long getUserIdByEmail(String email) {
        return findUserByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new NotFoundException("이메일에 해당하는 유저가 없습니다."));
    }

    public boolean hasDetailInfo(Long userId) {
        User u = findUser(userId)
                .orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
        if(u.getPhoneNumber() == null)
            return true;

        return false;
    }

    public UserInfoRspDto getUserInfo(Long userId) {
        return findUser(userId)
                .map(UserInfoRspDto::new)
                .orElseThrow(() -> new NotFoundException("해당하는 유저가 없습니다."));
    }

    @Transactional
    public void saveUserAuthImage(UserReqDto userReqDto, String imgUrl) throws IOException {

        // uID 찾기 -> s3이미지 저장할때 이름으로 써야함
        User u = findUserByEmail(userReqDto.getEmail())
                .orElseThrow(() -> new NotFoundException("이메일에 해당하는 유저가 없습니다."));

        // 먼저 db에 임시 저장
        Image img = imageService.initImageInDb(u.getId());

        // 파일로 변환, 사진 s3에 저장 (이미지 아이디가 파일 이름임)
        MultipartFile f = imageService.downloadImageAndConvertToMultipartFile(imgUrl, img.getId().toString());
        imageService.saveImageInS3(f, f.getOriginalFilename());

        // 임시저장한 프사 정보 image 테이블 수정
        img = imageService.editImageInDb(img, f);

        // 프사 정보 user 정보에 저장
        u.setUserImg(img);
    }

    @Transactional
    public ImageRspDto editUserImage(Long uId, MultipartFile file) throws IOException {

        // 먼저 db에 임시 저장
        Image img = imageService.initImageInDb(uId);

        imageService.saveImageInS3(file, img.getId()+".jpg");

        // 임시저장한 프사 정보 image 테이블 수정
        img = imageService.editImageInDb(img, file);

        // 프사 정보 user 정보에 저장
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        u.setUserImg(img);

        return new ImageRspDto(img.getFilePath());
    }

    public ImageRspDto getUserImage(Long uId) {
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        Image img = imageService.findImage(u.getMainImage().getId())
                .orElseThrow(() -> new NotFoundException("이미지아이디에 해당하는 이미지가 없습니다."));

        return new ImageRspDto(img.getFilePath());
    }

    @Transactional
    public void editUserName(Long uId, UserProfileReqDto userProfileReqDto) {
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        u.setUserName(userProfileReqDto.getUserName());
    }

    public boolean checkUserExists(String email){
        return findUserByEmail(email).isPresent();
    }

    public void checkUserGender(User user) {
        if (user.getUserGender() == null) {
            throw new IllegalStateException("성별이 설정되지 않은 유저입니다.");
        }
    }

    private Optional<User> saveUser(User user){ return Optional.of(userRepository.save(user));}

    public Optional<User> findUser(Long userId){
        return Optional.ofNullable(userId).flatMap(userRepository::findById);
    }

    public Optional<User> findUserByEmail(String email){
        return Optional.ofNullable(email).flatMap(userRepository::findByUserEmail);
    }



    public Optional<List<User>> findUsersByKeyWord(String keyword) {
        return Optional.ofNullable(userRepository.findBysearchKeyword(keyword))
                .filter(users -> users.isPresent() && !users.get().isEmpty())
                .orElseGet(Optional::empty);
    }

    public boolean chkPhoneNum(String phoneNum) {
        if(phoneNum.length() == 13) return true;
        else return false;
    }

    public UserStatusRspDto getUserStatus(long id){
        User u = findUser(id)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        UserStatus userStatus = u.getUserStatus();
        if(userStatus == null){
            userStatus = UserStatus.OFFLINE;
        }
        return new UserStatusRspDto(userStatus);
    }

}

