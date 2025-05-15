package com.base.repository;
import com.base.entity.Draw;
import com.base.entity.UserList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawRepository extends JpaRepository<Draw, Long> {
    List<Draw> findByList(UserList list);
}

