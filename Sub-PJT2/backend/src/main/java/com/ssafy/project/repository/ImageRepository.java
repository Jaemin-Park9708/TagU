package com.ssafy.project.repository;

import com.ssafy.project.domain.user.Image;
import com.ssafy.project.domain.user.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByOrigFileName(String orgFileName);

    Optional<List<Image>> findAllByProfile(Profile p);
}
