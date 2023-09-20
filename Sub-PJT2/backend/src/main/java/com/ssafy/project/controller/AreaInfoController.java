package com.ssafy.project.controller;

import com.ssafy.project.dto.response.AreaGugunDto;
import com.ssafy.project.dto.response.AreaSidoDto;
import com.ssafy.project.service.AreaInfoService;
//import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/areas", produces = "application/json; charset=utf8")
@Tag(name = "유저 지역", description = "유저 테이블 관련 API")
public class AreaInfoController {
    private final AreaInfoService areaInfoService;


    @GetMapping()
    @Operation(summary = "시도 지역 정보 가져오기", description = "")
    protected List<AreaSidoDto> getSidoAreaInfos() throws Exception {
        return areaInfoService.getSidoAreaInfos();
    }

    @GetMapping("/{sidocode}")
    @Operation(summary = "해당 시도 지역의 구군 지역 정보 가져오기", description = "")
    protected List<AreaGugunDto> getGugunAreaInfosBySido(@PathVariable int sidocode) throws Exception {
        return areaInfoService.getGugunAreaInfos(sidocode);
    }

}
