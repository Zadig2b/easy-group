package com.base.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.dto.DrawDto;
import com.base.entity.User;
import com.base.entity.UserList;
import com.base.repository.UserListRepository;
import com.base.service.DrawService;

@RestController
@RequestMapping("/api/lists/{listId}/draws")
@CrossOrigin(origins = "http://localhost:4200")
public class DrawController {

    private final DrawService drawService;
    private final UserListRepository listRepo;

    public DrawController(DrawService drawService, UserListRepository listRepo) {
        this.drawService = drawService;
        this.listRepo = listRepo;
    }

    @PostMapping
    public void saveDraw(@PathVariable Long listId, @RequestBody DrawDto drawDto, @AuthenticationPrincipal User user) {
        UserList list = listRepo.findById(listId)
            .filter(l -> l.getOwner().equals(user))
            .orElseThrow();
        drawService.saveDraw(list, drawDto);
    }

    @GetMapping
    public List<DrawDto> getHistory(@PathVariable Long listId, @AuthenticationPrincipal User user) {
        UserList list = listRepo.findById(listId)
            .filter(l -> l.getOwner().equals(user))
            .orElseThrow();
        return drawService.getDrawHistory(list);
    }
}

