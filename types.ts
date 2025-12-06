export enum InteractionLevel {
  Beginner = 'مبتدئ',
  Intermediate = 'متوسط',
  Active = 'نشط',
}

export interface Task {
  id: string;
  name: string;
}

export interface Member {
  id: string;
  name: string;
  level: InteractionLevel | null;
  notes: string;
  finalRating: string;
  tasks: { taskId: string; completed: boolean }[];
}
