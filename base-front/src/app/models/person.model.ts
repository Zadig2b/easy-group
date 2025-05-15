export interface Person {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'UNDISCLOSED';
  age: number;
  frenchLevel: number;
  oldDwwm: boolean;
  techLevel: number;
  profile: 'TIMIDE' | 'RESERVE' | 'A_LAISE';
}
