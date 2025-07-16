import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const initialDraft = {
    title: '',
    content: '',
    tag:'Tag' as 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping',
};

export type Draft = typeof initialDraft;

type Store = {
    draft: Draft;
    setDraft: (note: Draft) => void;
    clearDraft: () => void;
}
export const useStore = create<Store>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft', // localStorage key
    }
  )
)