package com.ssafy.project.controller;
import java.util.Map;

//import javax.annotation.PostConstruct;

import com.ssafy.project.service.WebRtcService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@RequiredArgsConstructor
@Tag(name = "WebRTC", description = "")
public class WebRtcController {

    private final WebRtcService webRtcService;

    @GetMapping("/session")
    @Operation(summary = "프런트에서 안쓰는 API임!) 미팅룸 세션 만들기", description = "반환되는 string은 session의 아이디")
    public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        return webRtcService.initializeSession();
    }

    @GetMapping("/token/{sessionId}")
    @Operation(summary = "미팅룸 토큰 만들기", description = "반환되는 string은 session에 참여할 수 있도록 해주는 token")
    public String getToken(@PathVariable String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        return webRtcService.createConnection(sessionId);
    }

}
