package com.ssafy.project.service;

import com.ssafy.project.domain.user.Gugun;
import com.ssafy.project.dto.response.AreaGugunDto;
import com.ssafy.project.dto.response.AreaSidoDto;
import com.ssafy.project.exception.NotFoundException;
import com.ssafy.project.repository.AreaGugunRepository;
import com.ssafy.project.repository.AreaSidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AreaInfoService {

    private final AreaSidoRepository areaSidoRepository;
    private final AreaGugunRepository areaGugunRepository;

    public List<AreaSidoDto> getSidoAreaInfos(){
        return areaSidoRepository.findAll().stream().map(AreaSidoDto::new).toList();
    }

    public List<AreaGugunDto> getGugunAreaInfos(int sido_code){
        return areaGugunRepository.findAllBySidoId(sido_code).orElseThrow(() -> new NotFoundException("해당 시도의 구군 정보가 없습니다."))
                .stream().map(AreaGugunDto::new).toList();
    }

}
