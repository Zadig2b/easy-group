package com.base.service;

import com.base.entity.UserList;
import com.base.entity.User;
import com.base.repository.UserListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserListService {
    private final UserListRepository repository;

    public UserListService(UserListRepository repository) {
        this.repository = repository;
    }

    public List<UserList> getListsByUser(User user) {
        return repository.findByOwner(user);
    }

    public UserList create(User user, String name) {
        UserList list = new UserList();
        list.setName(name);
        list.setOwner(user);
        return repository.save(list);
    }
}