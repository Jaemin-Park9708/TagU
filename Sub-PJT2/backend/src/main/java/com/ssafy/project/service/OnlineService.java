package com.ssafy.project.service;

import com.ssafy.project.domain.user.User;
import com.ssafy.project.domain.user.UserStatus;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OnlineService {

    private final UserRepository userRepository;
    @Transactional
    public void setSessionId(Long uId, String sessionId){
        System.out.println("세션아이디 설정하러 와서");
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        System.out.println("물만 마시고 갔나?");
        u.setSessionId(sessionId);
    }
    public Optional<User> findUserBySessionId(String sessionId){
        return Optional.ofNullable(sessionId).flatMap(userRepository::findBySessionId);
    }

    public Optional<User> findUser(Long userId){
        return Optional.ofNullable(userId).flatMap(userRepository::findById);
    }

    @Transactional
    public void editUserStatus(Long uId, UserStatus userStatus){
        User u = findUser(uId)
                .orElseThrow(() -> new NotFoundException("유저아이디에 해당하는 유저가 없습니다."));
        u.setUserStatus(userStatus);
    }
}
