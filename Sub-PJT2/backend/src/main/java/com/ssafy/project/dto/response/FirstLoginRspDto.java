package com.ssafy.project.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FirstLoginRspDto {
    private boolean firstLogin;

    public FirstLoginRspDto(boolean b) {
        this.firstLogin = b;
    }

}
