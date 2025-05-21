import { Person } from '../core/models/person.model'; 
import { GroupDto } from '../core/models/group.dto';



export function generateGroups(persons: Person[], groupSize: number): GroupDto[] {
  const shuffled = [...persons].sort(() => Math.random() - 0.5);
  const groups: GroupDto[] = [];

  for (let i = 0; i < shuffled.length; i += groupSize) {
    const chunk = shuffled.slice(i, i + groupSize);
groups.push({
  name: `Groupe ${groups.length + 1}`,
  memberIds: chunk.map(p => p.id),
  memberNames: chunk.map(p => p.name)
});

  }

  return groups;
}
