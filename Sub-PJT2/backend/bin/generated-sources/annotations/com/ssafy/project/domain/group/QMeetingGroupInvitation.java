package com.ssafy.project.domain.group;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetingGroupInvitation is a Querydsl query type for MeetingGroupInvitation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetingGroupInvitation extends EntityPathBase<MeetingGroupInvitation> {

    private static final long serialVersionUID = 258647354L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetingGroupInvitation meetingGroupInvitation = new QMeetingGroupInvitation("meetingGroupInvitation");

    public final QMeetingGroup group;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<InvitationStatus> invitationStatus = createEnum("invitationStatus", InvitationStatus.class);

    public final com.ssafy.project.domain.user.QUser user;

    public QMeetingGroupInvitation(String variable) {
        this(MeetingGroupInvitation.class, forVariable(variable), INITS);
    }

    public QMeetingGroupInvitation(Path<? extends MeetingGroupInvitation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetingGroupInvitation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetingGroupInvitation(PathMetadata metadata, PathInits inits) {
        this(MeetingGroupInvitation.class, metadata, inits);
    }

    public QMeetingGroupInvitation(Class<? extends MeetingGroupInvitation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.group = inits.isInitialized("group") ? new QMeetingGroup(forProperty("group")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.project.domain.user.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

