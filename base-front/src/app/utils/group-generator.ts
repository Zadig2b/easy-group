import { Person } from '../core/models/person.model'; // à créer ou adapter

export interface Group {
  name: string;
  memberIds: number[];
}

export function generateGroups(persons: Person[], groupSize: number): Group[] {
  const shuffled = [...persons].sort(() => Math.random() - 0.5);
  const groups: Group[] = [];

  for (let i = 0; i < shuffled.length; i += groupSize) {
    const chunk = shuffled.slice(i, i + groupSize);
    groups.push({
      name: `Groupe ${groups.length + 1}`,
      memberIds: chunk.map(p => p.id),
    });
  }

  return groups;
}
