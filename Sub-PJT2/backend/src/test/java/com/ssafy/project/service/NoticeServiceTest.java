package com.ssafy.project.service;

import com.ssafy.project.domain.notice.NoticeType;
import com.ssafy.project.dto.request.NoticeReqDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

@SpringBootTest
@Transactional
class NoticeServiceTest {
    @Autowired
    NoticeService noticeService;

    @Autowired
    UserService userService;

    @Rollback(value = false)
    @Test
    public void 공지확인() throws Exception {
        //given

        //when
        NoticeReqDto noticeReqDto = new NoticeReqDto(1L, NoticeType.FRIEND_REQUEST, "test");
        //then
    }

}