package com.ssafy.project.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.friend.FriendShipStatus;
import com.ssafy.project.domain.friend.QFriendShip;
import com.ssafy.project.domain.user.QProfile;
import com.ssafy.project.domain.user.QUser;
import com.ssafy.project.dto.response.FriendInfoRspDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
public class FriendShipRepositoryImpl implements FriendShipRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private final ModelMapper modelMapper;

    public FriendShipRepositoryImpl(JPAQueryFactory queryFactory, ModelMapper modelMapper) {
        this.queryFactory = queryFactory;
        this.modelMapper = modelMapper;
    }

    @Override
    public Optional<List<FriendInfoRspDto>> findFriendInfoAllByUserId(Long userId) {
        QFriendShip qFriendShip = QFriendShip.friendShip;
        QProfile qProfile = QProfile.profile;
        QUser qUser = QUser.user;

        List<Tuple> resultTuple = queryFactory
                .select(qUser.id,
                        qUser.userName,
                        qUser.userAge,
                        qUser.userGender,
                        qProfile.content,
                        qUser.mainImage.filePath,
                        qFriendShip.friendShipStatus)
                .from(qUser)
                .join(qProfile)
                .on(qUser.id.eq(qProfile.user.id))
                .join(qFriendShip)
                .on(qUser.id.eq(qFriendShip.targetUser.id))
                .where(qFriendShip.user.id.eq(userId))
                .fetch();

        log.info("resultTuple: {}", resultTuple);

        return Optional.of(resultTuple
//                .stream().map(tuple -> modelMapper.map(tuple, FriendInfoRspDto.class))
                .stream().map(tuple -> {
                    return new FriendInfoRspDto(
                    tuple.get(0, Long.class),
                    tuple.get(1, String.class),
                    tuple.get(2, Integer.class),
                    tuple.get(3, Gender.class),
                    tuple.get(4, String.class),
                    tuple.get(5, String.class),
                    tuple.get(6, FriendShipStatus.class));}
                )
                .collect(Collectors.toList()));
    }
}
