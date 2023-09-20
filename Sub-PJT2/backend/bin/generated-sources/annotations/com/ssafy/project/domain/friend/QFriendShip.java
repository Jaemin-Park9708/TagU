package com.ssafy.project.domain.friend;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFriendShip is a Querydsl query type for FriendShip
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFriendShip extends EntityPathBase<FriendShip> {

    private static final long serialVersionUID = 1688517404L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFriendShip friendShip = new QFriendShip("friendShip");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final EnumPath<FriendShipStatus> friendShipStatus = createEnum("friendShipStatus", FriendShipStatus.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final com.ssafy.project.domain.user.QUser targetUser;

    public final com.ssafy.project.domain.user.QUser user;

    public QFriendShip(String variable) {
        this(FriendShip.class, forVariable(variable), INITS);
    }

    public QFriendShip(Path<? extends FriendShip> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFriendShip(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFriendShip(PathMetadata metadata, PathInits inits) {
        this(FriendShip.class, metadata, inits);
    }

    public QFriendShip(Class<? extends FriendShip> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.targetUser = inits.isInitialized("targetUser") ? new com.ssafy.project.domain.user.QUser(forProperty("targetUser"), inits.get("targetUser")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.project.domain.user.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

