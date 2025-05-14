package com.base.controller;

import com.base.entity.User;
import com.base.entity.UserList;
import com.base.service.UserListService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "http://localhost:4200")
public class UserListController {

    private final UserListService listService;

    public UserListController(UserListService listService) {
        this.listService = listService;
    }

    @GetMapping
    public List<UserList> getLists(@AuthenticationPrincipal User user) {
        return listService.getListsByUser(user);
    }

    @PostMapping
    public UserList createList(@AuthenticationPrincipal User user, @RequestBody String name) {
        return listService.create(user, name);
    }
}
