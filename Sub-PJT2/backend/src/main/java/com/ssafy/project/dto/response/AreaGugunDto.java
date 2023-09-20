package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.Gugun;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AreaGugunDto {
    private int gugun_code;
    private String gugun_name;
    private int sido_code;

    public AreaGugunDto(Gugun gugun){
        this.gugun_code = gugun.getId();
        this.gugun_name = gugun.getGugun_name();
        this.sido_code = gugun.getSido().getId();
    }
}
