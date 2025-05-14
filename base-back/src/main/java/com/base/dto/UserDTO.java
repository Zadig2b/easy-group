package com.base.dto;

import com.base.entity.User;
import lombok.Getter;

@Getter
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }
}
