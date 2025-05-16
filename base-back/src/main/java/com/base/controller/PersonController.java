package com.base.controller;

import com.base.dto.PersonDto;
import com.base.entity.Person;
import com.base.entity.User;
import com.base.entity.UserList;
import com.base.repository.UserListRepository;
import com.base.service.PersonService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.base.repository.PersonRepository;

import java.util.List;

@RestController
@RequestMapping("/api/lists/{listId}/persons")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonController {

    private final PersonService personService;
    private final UserListRepository listRepository;
    private final PersonRepository personRepository;

    public PersonController(PersonService personService, UserListRepository listRepository,
            PersonRepository personRepository) {
        this.personService = personService;
        this.listRepository = listRepository;
        this.personRepository = personRepository;

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
    public PersonDto addPerson(@PathVariable Long listId, @RequestBody Person person,
            @AuthenticationPrincipal User user) {
        UserList list = listRepository.findById(listId)
                .filter(l -> l.getOwner().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Liste non trouvée ou non autorisée"));

        person.setList(list);
        return new PersonDto(personService.createPerson(list, person));
    }

@DeleteMapping("/{personId}")
public void deletePerson(@PathVariable Long listId, @PathVariable Long personId, @AuthenticationPrincipal User user) {
    UserList list = listRepository.findById(listId)
            .filter(l -> l.getOwner().getId().equals(user.getId()))
            .orElseThrow(() -> new RuntimeException("Liste non trouvée ou non autorisée"));

    personRepository.findById(personId)
            .filter(p -> p.getList().getId().equals(list.getId()))
            .orElseThrow(() -> new RuntimeException("Personne non trouvée ou non liée à cette liste"));

    personService.deletePersonById(personId);
}


}
