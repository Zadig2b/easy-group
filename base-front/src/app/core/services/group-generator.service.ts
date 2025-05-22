import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { GroupDto } from '../models/group.dto';

@Injectable({ providedIn: 'root' })
export class GroupGeneratorService {
  generateGroups(persons: Person[], groupSize: number): GroupDto[] {
    const shuffled = [...persons].sort(() => Math.random() - 0.5);
    const groups: GroupDto[] = [];

    for (let i = 0; i < shuffled.length; i += groupSize) {
      const group = shuffled.slice(i, i + groupSize);
      groups.push({
        name: `Groupe ${groups.length + 1}`,
        memberIds: group.map((p) => p.id),
        memberNames: group.map((p) => p.name),
      });
    }

    return groups;
  }
}
