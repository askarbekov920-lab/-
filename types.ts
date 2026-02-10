
export interface Story {
  id: string;
  title: string;
  period: string;
  content: string;
}

export interface Book {
  title: string;
  year: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
