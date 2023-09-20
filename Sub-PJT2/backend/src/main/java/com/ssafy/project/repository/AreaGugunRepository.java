package com.ssafy.project.repository;

import com.ssafy.project.domain.user.Gugun;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AreaGugunRepository extends JpaRepository<Gugun, Integer>{
    Optional<List<Gugun>> findAllBySidoId(int sido_code);
}
