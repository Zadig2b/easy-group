package com.base.service;


import com.base.entity.Person;
import com.base.entity.UserList;
import com.base.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repo;

    public PersonService(PersonRepository repo) {
        this.repo = repo;
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
}
