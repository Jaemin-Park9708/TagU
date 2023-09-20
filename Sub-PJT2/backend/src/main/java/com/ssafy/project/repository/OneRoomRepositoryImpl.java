package com.ssafy.project.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QOneMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import com.ssafy.project.domain.user.User;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
public class OneRoomRepositoryImpl implements OneRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public OneRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<OneMeetingRoom> findRamdomOneRoom(User user) {
        QOneMeetingRoom qOneRoom = QOneMeetingRoom.oneMeetingRoom;
        QUser qUser = QUser.user;

        List<Long> oneRoomIdList =  queryFactory.select(qOneRoom.id)
                .from(qOneRoom)
                .where(qOneRoom.userList.size().eq(1))
                .fetch();

        BooleanBuilder notEqGenderOneRoomExist = new BooleanBuilder()
                        .and(qUser.userGender.ne(user.getUserGender()))
                        .and(qOneRoom.id.in(oneRoomIdList));

        Optional<OneMeetingRoom> oneMeetingRoom = Optional.ofNullable(
                queryFactory.selectFrom(qOneRoom)
//                        .leftJoin(qOneRoom.userList, qUser)
                        .join(qOneRoom.userList, qUser)
                        .where(notEqGenderOneRoomExist)
                        .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                        .fetchFirst());

        log.info("oneMeetingRoom " + oneMeetingRoom);
        return oneMeetingRoom;
    }
}
