package com.base.entity;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "draw_id", nullable = false)
    private Draw draw;

    @ManyToMany
    @JoinTable(
        name = "group_person",
        joinColumns = @JoinColumn(
            name = "group_id",
            foreignKey = @ForeignKey(name = "fk_group_person_group")
        ),
        inverseJoinColumns = @JoinColumn(
            name = "person_id",
            foreignKey = @ForeignKey(name = "fk_group_person_person")
        )
    )
    private List<Person> members = new ArrayList<>();
}


