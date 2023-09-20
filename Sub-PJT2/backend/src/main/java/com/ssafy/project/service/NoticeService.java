package com.ssafy.project.service;

import com.ssafy.project.domain.notice.Notice;
import com.ssafy.project.dto.request.NoticeReqDto;
import com.ssafy.project.dto.response.NoticeRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final UserService userService;

    /**
     * 공지 추가
     */
    public NoticeRspDto insertNotice(NoticeReqDto noticeReqDto){
        return userService.findUser(noticeReqDto.getUserId())
                .map(user -> saveNotice(noticeReqDto.toEntity(user))
                        .map(NoticeRspDto::new)
                        .orElseThrow(()-> new IllegalStateException("맞지 않는 형식입니다.")))
                .orElseThrow(() -> new NotFoundException("공지할 유저가 없습니다."));
    }
    /**
     * 공지 삭제
     */
    public NoticeRspDto deleteNotice(Long noticeId){
        return noticeRepository.findById(noticeId)
                .map(notice -> {
                    notice.notValidated();
                    return new NoticeRspDto(notice);
                })
                .orElseThrow(() -> new NotFoundException("삭제할 공지가 없습니다."));
    }

    /**
     * 공지 불러오기
     */
    public List<NoticeRspDto> findNotices(Long userId, boolean isRead){
        return noticeRepository.findAllByUserId(userId).map(notices -> notices.stream()
                        .filter(Notice::isValid)
                        .map(notice -> {
            NoticeRspDto noticeRspDto = new NoticeRspDto(notice);
            if(isRead){
                notice.readNotice();
            }
            return noticeRspDto;
        }).collect(toList()))
        .orElseGet(ArrayList::new);
    }

    private Optional<Notice> saveNotice(Notice notice){
        return Optional.of(noticeRepository.save(notice));
    }
    public Optional<List<Notice>> findAllByUserId(Long userId){
        return noticeRepository.findAllByUserId(userId);
    }
}
