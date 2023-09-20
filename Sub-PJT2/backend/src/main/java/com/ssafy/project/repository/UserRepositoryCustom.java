package com.ssafy.project.repository;

import com.ssafy.project.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    Optional<List<User>> findBysearchKeyword(String keyword);
}
