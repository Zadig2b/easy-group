package com.base.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "person_count")
    private int personCount = 0;

    @Column(name = "draw_count")
    private int drawCount = 0;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    public void incrementPersonCount() {
        this.personCount++;
    }

    public void decrementPersonCount() {
        if (this.personCount > 0)
            this.personCount--;
    }

    public void incrementDrawCount() {
        this.drawCount++;
    }
    

}
