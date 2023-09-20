package com.ssafy.project.service;

import com.ssafy.project.domain.user.Comment;
import com.ssafy.project.domain.user.Profile;
import com.ssafy.project.dto.request.CommentReqDto;
import com.ssafy.project.dto.response.CommentRspDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.CommentRepository;
import com.ssafy.project.service.ProfileService;
import com.ssafy.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProfileService profileService;
    private final UserService userService;

    public List<CommentRspDto> getComments(Long pId) {
        Profile p = profileService.getProfile(pId);
        List<Comment> c = findComments(p).orElseThrow(() -> new NotFoundException("해당 프로필에 대한 커멘트가 없습니다. "));
        return c.stream().map(CommentRspDto::new).toList();
    }

    @Transactional(readOnly = false)
    public CommentRspDto postComment(Long uId, Long pId, CommentReqDto commentReqDto) {
        return saveComment(new Comment(
                    userService.findUser(uId).orElseThrow(() -> new NotFoundException("해당 아이디 유저 없음 ")),
                    profileService.getProfile(pId),
                    commentReqDto.getTitle(),
                    commentReqDto.getContent()))
                .map(CommentRspDto::new)
                .orElseThrow(() -> new NotFoundException("유효하지 않은 커멘트입니다."));
    }

    @Transactional(readOnly = false)
    public CommentRspDto editComment(Long uId, Long cId, CommentReqDto commentReqDto) throws IllegalAccessException {
        Comment c = findComment(cId)
                        .orElseThrow(() ->  new NotFoundException("해당 아이디의 커멘트가 없습니다. "));
        if(c.getUser().getId() != uId)
            throw new IllegalAccessException("해당 커멘트에 대한 접근권한이 없습니다. ");
        c.updateComment(commentReqDto);
        return new CommentRspDto(c);
    }

    @Transactional(readOnly = false)
    public String deleteComment(Long uId, Long commentId) throws IllegalAccessException {
        Comment c = findComment(commentId)
                .orElseThrow(() ->  new NotFoundException("해당 아이디의 커멘트가 없습니다. "));
        if(c.getUser().getId() != uId)
            throw new IllegalAccessException("해당 커멘트에 대한 접근권한이 없습니다. ");
        deleteComment(commentId);
        return "deleted";
    }


    // ========================================================
    public Optional<List<Comment>> findComments(Profile p) {
        return commentRepository.findAllByProfile(p);
    }

    public Optional<Comment> findComment(Long commentId) {
        return commentRepository.findById(commentId);
    }

    @Transactional(readOnly = false)
    public Optional<Comment> saveComment(Comment c) {
        return Optional.of(commentRepository.save(c));
    }

    @Transactional(readOnly = false)
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

}
