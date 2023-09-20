package com.ssafy.project.dto.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;

@Getter
@ToString
@AllArgsConstructor
public class ErrorResponse {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final String timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final String path;

    public static ErrorResponse of(HttpStatus httpStatus, String message, HttpServletRequest request) {
        return new ErrorResponse(LocalDate.now().toString(), httpStatus.value(), httpStatus.name(), message, request.getContextPath());
    }

    //생성자 및 정적 메소드 생략

    public String convertToJson() throws JsonProcessingException {
        return objectMapper.writeValueAsString(this);
    }

}
