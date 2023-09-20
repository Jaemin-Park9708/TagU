package com.ssafy.project.domain.friend;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFriendMessage is a Querydsl query type for FriendMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFriendMessage extends EntityPathBase<FriendMessage> {

    private static final long serialVersionUID = -1141509337L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFriendMessage friendMessage = new QFriendMessage("friendMessage");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final QFriendShip freindShip;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public final com.ssafy.project.domain.user.QUser messageFrom;

    public final com.ssafy.project.domain.user.QUser messageTo;

    public QFriendMessage(String variable) {
        this(FriendMessage.class, forVariable(variable), INITS);
    }

    public QFriendMessage(Path<? extends FriendMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFriendMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFriendMessage(PathMetadata metadata, PathInits inits) {
        this(FriendMessage.class, metadata, inits);
    }

    public QFriendMessage(Class<? extends FriendMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.freindShip = inits.isInitialized("freindShip") ? new QFriendShip(forProperty("freindShip"), inits.get("freindShip")) : null;
        this.messageFrom = inits.isInitialized("messageFrom") ? new com.ssafy.project.domain.user.QUser(forProperty("messageFrom"), inits.get("messageFrom")) : null;
        this.messageTo = inits.isInitialized("messageTo") ? new com.ssafy.project.domain.user.QUser(forProperty("messageTo"), inits.get("messageTo")) : null;
    }

}

