package com.ssafy.project.repository;

import com.ssafy.project.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findBySessionId(String sessionId);
}
