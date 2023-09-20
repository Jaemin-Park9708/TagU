package com.ssafy.project.domain.group;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingGroup is a Querydsl query type for MeetingGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingGroup extends EntityPathBase<MeetingGroup> {

    private static final long serialVersionUID = -517468479L;

    public static final QMeetingGroup meetingGroup = new QMeetingGroup("meetingGroup");

    public final com.ssafy.project.domain.QBaseTimeEntity _super = new com.ssafy.project.domain.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final EnumPath<com.ssafy.project.domain.Gender> groupGender = createEnum("groupGender", com.ssafy.project.domain.Gender.class);

    public final ListPath<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser> groupUser = this.<com.ssafy.project.domain.user.User, com.ssafy.project.domain.user.QUser>createList("groupUser", com.ssafy.project.domain.user.User.class, com.ssafy.project.domain.user.QUser.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUsedDate = _super.lastUsedDate;

    public QMeetingGroup(String variable) {
        super(MeetingGroup.class, forVariable(variable));
    }

    public QMeetingGroup(Path<? extends MeetingGroup> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMeetingGroup(PathMetadata metadata) {
        super(MeetingGroup.class, metadata);
    }

}

