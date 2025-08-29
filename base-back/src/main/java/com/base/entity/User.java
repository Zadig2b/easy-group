package com.base.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.util.ArrayList;
import java.util.List;

import java.time.Instant;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;

    @Builder.Default
    @Column(nullable = false)
    private boolean isActivated = true;
    
    @Builder.Default
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserList> lists = new ArrayList<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    private LocalDate cguDate;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof User))
            return false;
        return this.getId() != null && this.getId().equals(((User) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
