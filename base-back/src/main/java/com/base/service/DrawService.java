package com.base.service;

import com.base.dto.DrawDto;
import com.base.dto.GroupDto;
import com.base.entity.Draw;
import com.base.entity.GroupEntity;
import com.base.entity.Person;
import com.base.entity.UserList;
import com.base.repository.DrawRepository;
import com.base.repository.GroupEntityRepository;
import com.base.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DrawService {

    private final DrawRepository drawRepository;
    private final PersonRepository personRepository;

    public DrawService(DrawRepository drawRepository, GroupEntityRepository groupRepository,
            PersonRepository personRepository) {
        this.drawRepository = drawRepository;
        this.personRepository = personRepository;
    }

    public void saveDraw(UserList list, DrawDto dto) {
        Draw draw = new Draw();
        draw.setList(list);
        draw.setCreatedAt(LocalDateTime.now());

        List<GroupEntity> savedGroups = new ArrayList<>();

        for (GroupDto groupDto : dto.getGroups()) {
            GroupEntity group = new GroupEntity();
            group.setName(groupDto.getName());
            group.setDraw(draw);

            List<Person> members = personRepository.findAllById(groupDto.getMemberIds());
            group.setMembers(members);
            savedGroups.add(group);
        }

        draw.setGroups(savedGroups);
        drawRepository.save(draw); // cascade = ALL → enregistre aussi les groupes
    }

    public List<DrawDto> getDrawHistory(UserList list) {
        return drawRepository.findByList(list).stream().map(draw -> {
            DrawDto dto = new DrawDto();
            dto.setId(draw.getId());
            dto.setCreatedAt(draw.getCreatedAt().toString());

            List<GroupDto> groups = draw.getGroups().stream().map(group -> {
                GroupDto g = new GroupDto();
                g.setName(group.getName());
                g.setMemberIds(group.getMembers().stream().map(Person::getId).toList());
                g.setMemberNames(group.getMembers().stream()
                        .map(Person::getName)
                        .toList());

                return g;
            }).toList();

            dto.setGroups(groups);
            return dto;
        }).toList();
    }
}
