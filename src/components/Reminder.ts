export interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  alerted?: boolean;
}
