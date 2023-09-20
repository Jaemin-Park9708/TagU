package com.ssafy.project.service;

import com.ssafy.project.exception.NotFoundException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WebRtcService {

    private Map<String, Session> sessions = new ConcurrentHashMap<>();

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    // 방 만들기 : 방장 혹은 관리자(이렇게 하면 한명 제외하고 띄워야 함)
    public String initializeSession() throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.createSession();
        sessions.put(session.getSessionId(), session);
        return session.getSessionId();
    }

    public String createConnection(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openvidu.getActiveSession(sessionId);
        Session tmpSes = sessions.get(sessionId);

        if (tmpSes == null) {
            throw new NotFoundException("해당 아이디에 해당에 세션이 없습니다. ");
        }
        // 들어오는 사람의 권한이 publisher. role()을 어디서 만지지??
//        OpenViduRole role = OpenViduRole.PUBLISHER; // OpenViduRole.SUBSCRIBER;
//        TokenOptions tokenOpts = new TokenOptions.Builder()
//                                        .role(role)
//                                        .data("SERVER= participant num").build();
//        String token = tmpSes.generateToken(tokenOpts);
//        return token;

        Connection connection = tmpSes.createConnection();
        return connection.getToken();
    }

}
