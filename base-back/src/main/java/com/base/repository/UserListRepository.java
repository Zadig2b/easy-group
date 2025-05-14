package com.base.repository;


import com.base.entity.UserList;
import com.base.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserListRepository extends JpaRepository<UserList, Long> {
    List<UserList> findByOwner(User owner);
}
