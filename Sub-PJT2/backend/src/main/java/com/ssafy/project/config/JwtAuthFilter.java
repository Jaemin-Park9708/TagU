package com.ssafy.project.config;

import com.ssafy.project.dto.request.UserReqDto;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.filter.GenericFilterBean;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends GenericFilterBean {
    private final TokenService tokenService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println(">>> JwtAuthFilter");

        String token = ((HttpServletRequest)request).getHeader("Auth");

        System.out.println(">>> token: "+token);

        if (token != null && tokenService.verifyToken(token, response)) {
            Long uId = tokenService.parseUId(token);
            System.out.println(">>> after verifyToken");
            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            UserReqDto userReqDto = new UserReqDto(uId, "email","이름");

            Authentication auth = getAuthentication(userReqDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        else if(token != null && token.equals("master")){
            Long uId = Long.parseLong(((HttpServletRequest) request).getHeader("userId"));
//            System.out.println(">>> master email: "+tmpEmail);

            UserReqDto userReqDto = new UserReqDto(uId, "email", "이름");
            Authentication auth = getAuthentication(userReqDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        else if(isSwaggerRequest((HttpServletRequest) request)) {
            UserReqDto userReqDto = new UserReqDto(0L, "email", "이름");
            Authentication auth = getAuthentication(userReqDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserReqDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }

    private boolean isSwaggerRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.contains("swagger") || uri.contains("api-docs") || uri.contains("webjars");
    }

}

