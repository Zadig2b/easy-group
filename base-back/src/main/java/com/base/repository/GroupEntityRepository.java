package com.base.repository;
import com.base.entity.Draw;
import com.base.entity.GroupEntity;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupEntityRepository extends JpaRepository<GroupEntity, Long> {
    List<GroupEntity> findByDraw(Draw draw);
}

