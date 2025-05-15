package com.base.controller;

import com.base.dto.ListDto;
import com.base.entity.User;
import com.base.entity.UserList;
import com.base.service.UserListService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "http://localhost:4200")
public class UserListController {

    private final UserListService listService;

    public UserListController(UserListService listService) {
        this.listService = listService;
    }

    // ✅ Obtenir toutes les listes de l'utilisateur
    @GetMapping
    public List<ListDto> getLists(@AuthenticationPrincipal User user) {
        return listService.getListsByUser(user)
                .stream()
                .map(ListDto::new)
                .toList();
    }

    // ✅ Obtenir une liste par son ID (si l'utilisateur est propriétaire)
    @GetMapping("/{id}")
    public ListDto getListById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        UserList list = listService.getListsByUser(user)
                .stream()
                .filter(l -> l.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Liste non trouvée"));
        return new ListDto(list);
    }

    // ✅ Créer une liste
    @PostMapping
    public ListDto createList(@AuthenticationPrincipal User user, @RequestBody String name) {
        UserList created = listService.create(user, name);
        return new ListDto(created);
    }
}
