package com.base.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;



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

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Person> persons = new ArrayList<>();

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Draw> draws = new ArrayList<>();

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
