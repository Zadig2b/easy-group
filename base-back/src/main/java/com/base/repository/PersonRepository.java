package com.base.repository;

import com.base.entity.Person;
import com.base.entity.UserList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByList(UserList list);
}
