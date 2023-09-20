package com.ssafy.project.domain.room;

import com.ssafy.project.domain.Gender;
import com.ssafy.project.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@DiscriminatorValue("O")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class OneMeetingRoom extends MeetingRoom{
    @Builder
    public OneMeetingRoom(User user) {
        addUser(user);
    }
}
