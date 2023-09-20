package com.ssafy.project.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGugun is a Querydsl query type for Gugun
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGugun extends EntityPathBase<Gugun> {

    private static final long serialVersionUID = 834674205L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGugun gugun = new QGugun("gugun");

    public final StringPath gugun_name = createString("gugun_name");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QSido sido;

    public QGugun(String variable) {
        this(Gugun.class, forVariable(variable), INITS);
    }

    public QGugun(Path<? extends Gugun> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGugun(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGugun(PathMetadata metadata, PathInits inits) {
        this(Gugun.class, metadata, inits);
    }

    public QGugun(Class<? extends Gugun> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.sido = inits.isInitialized("sido") ? new QSido(forProperty("sido")) : null;
    }

}

