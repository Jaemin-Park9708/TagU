package com.ssafy.project.domain.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthConstants {

    public static final String AUTHORIZATION_HEADER = "Auth";
    public static final String ROOM_ID = "RoomId";
    public static final String INFO = "Info";
    public static final String REFRESH_HEADER = "RefreshToken";
    public static final String TOKEN_TYPE = "Bearer";

}