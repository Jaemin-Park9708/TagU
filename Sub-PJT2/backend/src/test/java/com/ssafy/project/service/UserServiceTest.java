//package com.ssafy.project.service;
//
//import com.ssafy.project.domain.user.User;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//
//class UserServiceTest {
//    @Autowired
//    UserService userService;
//
//    @Test
//    public void 유저확인() throws Exception {
//        //given
//        User user = new User("ssafy","1234","김싸피","010",23, UserGender.MALE);
//
//        //when
//        Long savedId = userService.join(user);
//
//        //then
//        assertEquals(user, userService.findOne(savedId));
//
//    }
//
//}