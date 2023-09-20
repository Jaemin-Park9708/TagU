package com.ssafy.project.repository;

import com.ssafy.project.domain.user.Comment;
import com.ssafy.project.domain.user.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<List<Comment>> findAllByProfile(Profile profile);

}
