import axios from 'axios';
import type { Note, NotesResponse, NewNoteData} from "../types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';


export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  });
  return response.data;
  
};


export const deleteNote = async (noteId: number) : Promise<Note>  => {
  const response = await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export interface NotesParams {
  search: string;
  tag?: string;
  page: number;
  perPage?: number;
}

export const getNotes = async ({
  page,
  perPage =12,
  search,
  tag,
}: NotesParams): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search === "" ? {} : { search }),
      ... (tag === "All" ? {} :{ tag }),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

