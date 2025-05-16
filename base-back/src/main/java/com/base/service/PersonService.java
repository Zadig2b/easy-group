package com.base.service;

import com.base.entity.Person;
import com.base.entity.UserList;
import com.base.repository.PersonRepository;
import com.base.repository.UserListRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repo;
    private final UserListRepository listRepo;

    public PersonService(PersonRepository repo, UserListRepository listRepo) {
        this.repo = repo;
        this.listRepo = listRepo;
    }

    public List<Person> getAllByList(UserList list) {
        return repo.findByList(list);
    }

    public Person save(Person person) {
        return repo.save(person);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Person createPerson(UserList list, Person person) {
        person.setList(list);

        // Incrémente le compteur
        list.incrementPersonCount();
        listRepo.save(list); // Met à jour le compteur en BDD

        return repo.save(person);
    }

public void deletePersonById(Long id) {
    repo.findById(id).ifPresent(person -> {
        UserList list = person.getList();

        // 🔥 Supprimer la personne de tous les groupes
        person.getGroups().forEach(group -> group.getMembers().remove(person));

        // 🔥 Ensuite supprimer la personne elle-même
        repo.delete(person);

        list.decrementPersonCount();
        listRepo.save(list);
    });
}


}
