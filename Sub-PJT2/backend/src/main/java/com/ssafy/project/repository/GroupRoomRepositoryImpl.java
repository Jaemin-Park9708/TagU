package com.ssafy.project.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.group.MeetingGroup;
import com.ssafy.project.domain.group.QMeetingGroup;
import com.ssafy.project.domain.room.GroupMeetingRoom;
import com.ssafy.project.domain.room.OneMeetingRoom;
import com.ssafy.project.domain.room.QGroupMeetingRoom;
import com.ssafy.project.domain.user.QUser;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
public class GroupRoomRepositoryImpl implements GroupRoomRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public GroupRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Optional<GroupMeetingRoom> findRandomGroupRoom(MeetingGroup group) {
        QGroupMeetingRoom qGroupRoom = QGroupMeetingRoom.groupMeetingRoom;
        QMeetingGroup qGroup = QMeetingGroup.meetingGroup;
        QUser qUser = QUser.user;

        // 같은 성별 그룹 유저 + 해당 그룹방 => 3 -> 2 -> 1이 되도록 찾는다
        // 3 - groupSize 하여 찾는다

        // 다른 성별의 경우에는 그냥 있다면 넣어줌

        // 만약 같은 성별, 다른 성별이 없는 그룹방이라면
        // Optional::empty를 반환

        int size = group.getGroupUser().size();
        List<Long> getIdealNumRoomIdList = null;
        boolean flag = false;

        // 성별이 같은 경우가 있는지 탐색
        for(int i = 2 - size; i >= 0; i--) {
//        for(int i = 3 - size; i >= 0; i--) {
            getIdealNumRoomIdList = queryFactory.select(qGroupRoom.id)
                    .from(qGroupRoom)
                    .join(qGroupRoom.userList, qUser)
                    .groupBy(qGroupRoom.id, qUser.userGender)
                    .having(qGroupRoom.userList.size().eq(i), qUser.userGender.eq(group.getGroupGender()))
                    .fetch();
            if(getIdealNumRoomIdList.size() > 0){
                flag = true;
                break;
            }
        }

        log.info("getIdealNumRoomIdList " + getIdealNumRoomIdList);
        Optional<GroupMeetingRoom> groupMeetingRoom = Optional.empty();

        // 같은 경우가 있을 시에 랜덤하게 뽑아줌
        if(flag){
            groupMeetingRoom = Optional.ofNullable(
                    queryFactory.selectFrom(qGroupRoom)
                            .where(qGroupRoom.id.in(getIdealNumRoomIdList))
                            .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                            .fetchFirst());

            log.info("Flag groupMeetingRoom " + groupMeetingRoom);
        }
        // 다른 경우만이 존재하는 경우 => 2-size 인 조건에 해당 되는 내림차순으로 찾아줌
        else{
            groupMeetingRoom = Optional.ofNullable(queryFactory.selectFrom(qGroupRoom)
                    .join(qGroupRoom.userList, qUser)
                    .groupBy(qGroupRoom.id, qUser.userGender)
                    .having(qGroupRoom.userList.size().loe(2),qUser.userGender.ne(group.getGroupGender()))
                    .orderBy(qGroupRoom.userList.size().desc())  // 내림차순 정렬
                    .fetchFirst());
        }

        return groupMeetingRoom;
    }
}
