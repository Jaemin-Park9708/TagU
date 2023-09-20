package com.ssafy.project.domain.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "sido")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Sido {
    @Id
    @Column(name = "sido_code")
    private int id;
    private String sido_name;
}
