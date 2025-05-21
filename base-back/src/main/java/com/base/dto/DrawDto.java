package com.base.dto;

import lombok.Data;

import java.util.List;

@Data
public class DrawDto {
    private Long id; // uniquement en lecture
    private String title;
    private String createdAt; // ISO string
    private List<GroupDto> groups;
}
