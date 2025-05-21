import { GroupDto } from "./group.dto";

export interface DrawDto {
  id?: number; // en lecture uniquement
  createdAt?: string; // ISO string, aussi en lecture
  title: string | null;
  groups: GroupDto[];
}


