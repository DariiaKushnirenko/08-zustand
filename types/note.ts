export type Tag ="Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  tag: Tag;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface NewNoteData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
  
export interface NewNoteData {
    title: string;
    content: string;
    tag: Tag;
  }
  
  export interface NotesResponse {
    notes: Note[];
    totalPages: number;
  }
  
