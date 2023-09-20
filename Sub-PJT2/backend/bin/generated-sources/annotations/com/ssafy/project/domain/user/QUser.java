package com.ssafy.project.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1912322592L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final QImage mainImage;

    public final com.ssafy.project.domain.group.QMeetingGroup meetingGroup;

    public final com.ssafy.project.domain.room.QMeetingRoom meetingRoom;

    public final StringPath phoneNumber = createString("phoneNumber");

    public final EnumPath<RoleType> roleType = createEnum("roleType", RoleType.class);

    public final StringPath sessionId = createString("sessionId");

    public final NumberPath<Integer> userAge = createNumber("userAge", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public final EnumPath<com.ssafy.project.domain.Gender> userGender = createEnum("userGender", com.ssafy.project.domain.Gender.class);

    public final NumberPath<Integer> userLike = createNumber("userLike", Integer.class);

    public final StringPath userName = createString("userName");

    public final EnumPath<UserStatus> userStatus = createEnum("userStatus", UserStatus.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mainImage = inits.isInitialized("mainImage") ? new QImage(forProperty("mainImage"), inits.get("mainImage")) : null;
        this.meetingGroup = inits.isInitialized("meetingGroup") ? new com.ssafy.project.domain.group.QMeetingGroup(forProperty("meetingGroup")) : null;
        this.meetingRoom = inits.isInitialized("meetingRoom") ? new com.ssafy.project.domain.room.QMeetingRoom(forProperty("meetingRoom")) : null;
    }

}

