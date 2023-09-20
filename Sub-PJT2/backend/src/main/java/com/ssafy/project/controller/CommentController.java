package com.ssafy.project.controller;

import com.ssafy.project.dto.request.CommentReqDto;
import com.ssafy.project.dto.response.CommentRspDto;
import com.ssafy.project.service.CommentService;
import com.ssafy.project.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/comments", produces = "application/json; charset=utf8")
@Tag(name = "댓글", description = "comment 관련 API")
public class CommentController {

    private final CommentService commentService;
    private final TokenService tokenService;

    // ===================== 코멘트 조회 =========================
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{profileId}")
    @Operation(summary = "댓글 가져오기", description = "{profileId} -> 댓글 가져올 프로필 아이디")
    public List<CommentRspDto> getComments(@PathVariable String profileId) {
        Long pId = Long.parseLong(profileId);
        return commentService.getComments(pId);
    }


    // ===================== 코멘트 등록 =========================
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{profileId}")
    @Operation(summary = "댓글 달기", description = "{profileId} -> 댓글 달 프로필 아이디")
    public CommentRspDto postComments(HttpServletRequest request, @RequestBody CommentReqDto commentReqDto,
                                            @PathVariable String profileId) {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.postComment(uId, Long.parseLong(profileId), commentReqDto);
    }

    // ===================== 코멘트 수정 =========================
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{commentId}")
    @Operation(summary = "댓글 수정하기", description = "{commentId} -> 댓글 아이디")
    public CommentRspDto editComments(HttpServletRequest request, @RequestBody CommentReqDto commentReqDto,
                                      @PathVariable String commentId) throws IllegalAccessException {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.editComment(uId, Long.parseLong(commentId), commentReqDto);
    }

    // ===================== 코멘트 삭제 =========================
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제하기", description = "{commentId} -> 댓글 아이디")
    public String deleteComments(HttpServletRequest request, @PathVariable String commentId) throws IllegalAccessException {
        Long uId = tokenService.parseUId(request.getHeader("Auth"));
        return commentService.deleteComment(uId, Long.parseLong(commentId));
    }

}
