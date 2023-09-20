package com.ssafy.project.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingRoom is a Querydsl query type for MeetingRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingRoom extends EntityPathBase<MeetingRoom> {

    private static final long serialVersionUID = 1512127249L;

    public static final QMeetingRoom meetingRoom = new QMeetingRoom("meetingRoom");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final StringPath sessionId = createString("sessionId");

    public final EnumPath<MeetingRoomStatus> status = createEnum("status", MeetingRoomStatus.class);

    public final ListPath<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser> userList = this.<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser>createList("userList", com.ssafy.project.domain.user.User.class, com.ssafy.project.domain.user.QUser.class, PathInits.DIRECT2);

    public QMeetingRoom(String variable) {
        super(MeetingRoom.class, forVariable(variable));
    }

    public QMeetingRoom(Path<? extends MeetingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMeetingRoom(PathMetadata metadata) {
        super(MeetingRoom.class, metadata);
    }

}

