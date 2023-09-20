package com.ssafy.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.user.QUser;
import com.ssafy.project.domain.user.User;

import java.util.List;
import java.util.Optional;

public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public UserRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<List<User>> findBysearchKeyword(String keyword) {
        QUser qUser = QUser.user;
        return Optional.ofNullable(queryFactory.selectFrom(qUser)
                .where(qUser.userName.contains(keyword))
                .fetch());
    }
}
