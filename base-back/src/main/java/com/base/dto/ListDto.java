package com.base.dto;

import com.base.entity.UserList;
import lombok.Data;

@Data
public class ListDto {
    private Long id;
    private String name;
    private int personCount;
    private int drawCount;

    public ListDto(UserList list) {
        this.id = list.getId();
        this.name = list.getName();
        this.personCount = list.getPersonCount();
        this.drawCount = list.getDrawCount();
    }
}
