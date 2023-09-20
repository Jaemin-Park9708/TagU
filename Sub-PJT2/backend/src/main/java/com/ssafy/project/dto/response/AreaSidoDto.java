package com.ssafy.project.dto.response;

import com.ssafy.project.domain.user.Sido;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AreaSidoDto {
    private int sido_code;
    private String sido_name;

    public AreaSidoDto(Sido sido) {
        this.sido_code = sido.getId();
        this.sido_name = sido.getSido_name();
    }
}

