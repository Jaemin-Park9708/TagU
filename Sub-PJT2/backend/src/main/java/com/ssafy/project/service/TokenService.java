package com.ssafy.project.service;

import com.ssafy.project.dto.request.Token;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService{
    private String issuer = "issuer";
    private String secretKey = "token-secret-key-token-secret-key";
    private String tmpToken;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    private final UserService userService;


    public Token generateToken(String id, String role) {
//        Long id = userService.getUserIdByEmail(uId);
        System.out.println(">>> generateToken / id: "+id+", role: "+role);
        long tokenPeriod = 100000L * 60L * 10L;
        long refreshPeriod = 1000L * 60L * 60L * 24L * 30L * 3L;

        Claims claims = Jwts.claims().setSubject(id);
        claims.put("role", role);

        Date now = new Date();
        Token t = new Token(
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + tokenPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact(),
                Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + refreshPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact());
        tmpToken = t.getToken();
        System.out.println("!!!!!----->>> token: "+tmpToken);
        return t;
    }


    public boolean verifyToken(String token, ServletResponse response) throws IOException {
//        System.out.println(">>> secretKey: " + secretKey);
//        System.out.println("!!!!!----->>> token: "+token);
        System.out.print(">>> verifyToken -> ");
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            System.out.println("verify succeeded!!");
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (ExpiredJwtException exp) {
            System.out.println("token expired!!!");
            SecurityContextHolder.clearContext(); ////
            throw new TokenNotValidateException("만료된 토큰임!!");
//            return false;
        } catch (Exception e) {
//            e.printStackTrace();
            System.out.println("failed verification..");
            return false;
        }
    }

    public boolean verifyToken(String token) throws IOException {
//        System.out.println(">>> secretKey: " + secretKey);
//        System.out.println("!!!!!----->>> token: "+token);
        System.out.print(">>> verifyToken -> ");
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            System.out.println("verify succeeded!!");
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (ExpiredJwtException exp) {
            System.out.println("token expired!!!");
            SecurityContextHolder.clearContext(); ////
            throw new TokenNotValidateException("만료된 토큰임!!");
//            return false;
        } catch (Exception e) {
//            e.printStackTrace();
            System.out.println("failed verification..");
            return false;
        }
    }


    public class TokenNotValidateException extends JwtException {
        public TokenNotValidateException(String message) {
            super(message);
        }
        public TokenNotValidateException(String message, Throwable cause) {
            super(message, cause);
        }
    }


    public Long parseUId(String token) {
//        System.out.println(">>> get user email");
        return Long.parseLong(
                Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject());
    }

    public String makeTmpToken(String id) {
//        UserInfoRspDto u = userService.getUserInfo(Long.parseLong(id));
        return generateToken(id, "USER").getToken();
    }
}