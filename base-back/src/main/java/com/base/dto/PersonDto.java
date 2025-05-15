package com.base.dto;

import com.base.entity.Person;
import lombok.Data;

@Data
public class PersonDto {
    private Long id;
    private String name;
    private String gender;
    private int age;
    private int frenchLevel;
    private boolean oldDwwm;
    private int techLevel;
    private String profile;

    public PersonDto(Person p) {
        this.id = p.getId();
        this.name = p.getName();
        this.gender = p.getGender().name();
        this.age = p.getAge();
        this.frenchLevel = p.getFrenchLevel();
        this.oldDwwm = p.isOldDwwm();
        this.techLevel = p.getTechLevel();
        this.profile = p.getProfile().name();
    }
}
