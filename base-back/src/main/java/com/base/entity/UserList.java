package com.base.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UserList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // nombre de personnes et de tirages (optionnel ou calculé)
    private int personCount = 0;
    private int drawCount = 0;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;
}
