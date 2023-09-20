package com.ssafy.project.attribute;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.project.domain.user.User;
import com.ssafy.project.dto.request.Token;
import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.service.TokenService;
import com.ssafy.project.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final UserRequestMapper userRequestMapper;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        System.out.println(">>> onAuthenticationSuccess!");
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserReqDto userReqDto = userRequestMapper.toDto(oAuth2User);

        log.info("Principal에서 꺼낸 OAuth2User = {}", oAuth2User);
        // 최초 로그인이라면 회원가입 처리를 한다.
        boolean userExists = userService.checkUserExists(userReqDto.getEmail());
        if(!userExists) {
            userService.signUpUser(userReqDto);
            userService.saveUserAuthImage(userReqDto, oAuth2User.getAttribute("picture"));
        }

        Long uId = userService.getUserIdByEmail(userReqDto.getEmail());

        String targetUrl;
        log.info(">>> generate token");
        Token token = tokenService.generateToken(uId.toString(), "USER");
        log.info(">>> generated token : {}", token);

//        targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/home")
        targetUrl = UriComponentsBuilder.fromUriString("https://tagyou.site/input")
//        targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/input")
//                .queryParam("Auth", token.getToken())
                .build().toUriString();
        Cookie cookie = new Cookie("Auth", token.getToken());
        cookie.setHttpOnly(false);
        cookie.setPath("/");
        response.addCookie(cookie);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
        System.out.println(">>> SuccessHandler done!");
    }
}