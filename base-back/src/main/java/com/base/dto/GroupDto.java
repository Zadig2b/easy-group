package com.base.dto;

import lombok.Data;

import java.util.List;

@Data
public class GroupDto {
    private String name;
    private List<Long> memberIds;
}
