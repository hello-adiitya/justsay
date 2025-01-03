export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  color: string;
  joinedAt: Date;
}