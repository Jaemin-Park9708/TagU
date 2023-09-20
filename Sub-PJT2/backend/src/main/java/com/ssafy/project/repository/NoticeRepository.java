package com.ssafy.project.repository;

import com.ssafy.project.domain.notice.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Optional<List<Notice>> findAllByUserId(Long userId);

}