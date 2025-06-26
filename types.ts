export interface Goal {
  id: string;
  title: string;
  targetDate: string; // ISO string format
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
