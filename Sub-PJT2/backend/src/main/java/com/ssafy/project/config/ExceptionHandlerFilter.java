package com.ssafy.project.config;

import com.ssafy.project.dto.response.ErrorResponse;
import com.ssafy.project.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (TokenService.TokenNotValidateException ex) {
//            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            setErrorResponse(HttpStatus.UNAUTHORIZED, request, response, ex);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletRequest request,
                                 HttpServletResponse response, Throwable ex) throws IOException {

        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");

        response.getWriter().write(
                ErrorResponse.of(
                                HttpStatus.UNAUTHORIZED,
                                ex.getMessage(),
                                request
                        )
                        .convertToJson()
        );
    }
}

