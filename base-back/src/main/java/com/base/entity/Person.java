package com.base.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private int frenchLevel;

    @Column(nullable = false)
    private boolean oldDwwm;

    @Column(nullable = false)
    private int techLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private UserList list;

    @ManyToMany(mappedBy = "members")
    private List<GroupEntity> groups = new ArrayList<>();

    public enum Gender {
        MALE, FEMALE, UNDISCLOSED
    }

    public enum Profile {
        TIMIDE, RESERVE, A_LAISE
    }
}
