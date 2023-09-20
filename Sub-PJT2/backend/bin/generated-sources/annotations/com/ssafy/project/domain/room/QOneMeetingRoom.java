package com.ssafy.project.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOneMeetingRoom is a Querydsl query type for OneMeetingRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOneMeetingRoom extends EntityPathBase<OneMeetingRoom> {

    private static final long serialVersionUID = -168233931L;

    public static final QOneMeetingRoom oneMeetingRoom = new QOneMeetingRoom("oneMeetingRoom");

    public final QMeetingRoom _super = new QMeetingRoom(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    //inherited
    public final StringPath sessionId = _super.sessionId;

    //inherited
    public final EnumPath<MeetingRoomStatus> status = _super.status;

    //inherited
    public final ListPath<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser> userList = _super.userList;

    public QOneMeetingRoom(String variable) {
        super(OneMeetingRoom.class, forVariable(variable));
    }

    public QOneMeetingRoom(Path<? extends OneMeetingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOneMeetingRoom(PathMetadata metadata) {
        super(OneMeetingRoom.class, metadata);
    }

}

