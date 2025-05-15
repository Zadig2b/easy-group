package com.base.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        System.out.println("🔐 [POST] saveDraw – userId=" + user.getId() + ", listId=" + listId);

        UserList list = listRepo.findById(listId)
            .orElseThrow(() -> {
                System.out.println("❌ Liste introuvable");
                return new ResponseStatusException(HttpStatus.NOT_FOUND);
            });

        System.out.println("✅ Liste trouvée – ownerId=" + list.getOwner().getId());

        if (!list.getOwner().equals(user)) {
            System.out.println("⛔ Accès refusé – userId ne correspond pas au ownerId");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        drawService.saveDraw(list, drawDto);
        System.out.println("✅ Tirage enregistré");
    }

    @GetMapping
    public List<DrawDto> getHistory(@PathVariable Long listId, @AuthenticationPrincipal User user) {
        System.out.println("🔐 [GET] getHistory – userId=" + user.getId() + ", listId=" + listId);

        UserList list = listRepo.findById(listId)
            .orElseThrow(() -> {
                System.out.println("❌ Liste introuvable");
                return new ResponseStatusException(HttpStatus.NOT_FOUND);
            });

        System.out.println("✅ Liste trouvée – ownerId=" + list.getOwner().getId());

        if (!list.getOwner().equals(user)) {
            System.out.println("⛔ Accès refusé – userId ne correspond pas au ownerId");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return drawService.getDrawHistory(list);
    }
}
