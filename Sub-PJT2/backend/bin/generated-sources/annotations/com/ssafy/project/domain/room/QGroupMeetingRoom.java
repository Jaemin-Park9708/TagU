package com.ssafy.project.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGroupMeetingRoom is a Querydsl query type for GroupMeetingRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupMeetingRoom extends EntityPathBase<GroupMeetingRoom> {

    private static final long serialVersionUID = -1816283844L;

    public static final QGroupMeetingRoom groupMeetingRoom = new QGroupMeetingRoom("groupMeetingRoom");

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

    public QGroupMeetingRoom(String variable) {
        super(GroupMeetingRoom.class, forVariable(variable));
    }

    public QGroupMeetingRoom(Path<? extends GroupMeetingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGroupMeetingRoom(PathMetadata metadata) {
        super(GroupMeetingRoom.class, metadata);
    }

}

