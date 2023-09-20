package com.ssafy.project.domain.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "gugun")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Gugun {
    @Id
    @Column(name = "gugun_code")
    private int id;
    private String gugun_name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sido;
}
