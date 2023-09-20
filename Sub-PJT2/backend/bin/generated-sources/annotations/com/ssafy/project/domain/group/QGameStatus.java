package com.ssafy.project.domain.group;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGameStatus is a Querydsl query type for GameStatus
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGameStatus extends EntityPathBase<GameStatus> {

    private static final long serialVersionUID = 1423915905L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGameStatus gameStatus = new QGameStatus("gameStatus");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.ssafy.project.domain.room.QMeetingRoom meetingRoom;

    public final NumberPath<Integer> readyNum = createNumber("readyNum", Integer.class);

    public final NumberPath<Integer> rejectNum = createNumber("rejectNum", Integer.class);

    public QGameStatus(String variable) {
        this(GameStatus.class, forVariable(variable), INITS);
    }

    public QGameStatus(Path<? extends GameStatus> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGameStatus(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGameStatus(PathMetadata metadata, PathInits inits) {
        this(GameStatus.class, metadata, inits);
    }

    public QGameStatus(Class<? extends GameStatus> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meetingRoom = inits.isInitialized("meetingRoom") ? new com.ssafy.project.domain.room.QMeetingRoom(forProperty("meetingRoom")) : null;
    }

}

