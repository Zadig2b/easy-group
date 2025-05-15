package com.base.controller;

import com.base.dto.PersonDto;
import com.base.entity.Person;
import com.base.entity.User;
import com.base.entity.UserList;
import com.base.repository.UserListRepository;
import com.base.service.PersonService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists/{listId}/persons")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

    private final PersonService personService;
    private final UserListRepository listRepository;

    public PersonController(PersonService personService, UserListRepository listRepository) {
        this.personService = personService;
        this.listRepository = listRepository;
    }

    @GetMapping
    public List<PersonDto> getPersons(@AuthenticationPrincipal User user, @PathVariable Long listId) {
        UserList list = listRepository.findById(listId)
                .filter(l -> l.getOwner().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Liste non trouvée ou non autorisée"));

        return personService.getAllByList(list).stream()
                .map(PersonDto::new)
                .toList();
    }

    @PostMapping
    public PersonDto addPerson(@PathVariable Long listId, @RequestBody Person person, @AuthenticationPrincipal User user) {
        UserList list = listRepository.findById(listId)
                .filter(l -> l.getOwner().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Liste non trouvée ou non autorisée"));

        person.setList(list);
        return new PersonDto(personService.save(person));
    }

    @DeleteMapping("/{personId}")
    public void delete(@PathVariable Long personId) {
        personService.delete(personId);
    }
}

