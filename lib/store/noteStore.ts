import { create } from 'zustand'

const initialDraft = {
    title: '',
    content: '',
    tag:'Tag' as 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping',
};

type Draft = typeof initialDraft;

type Store = {
    draft: Draft;
    setDraft: (note: Draft) => void;
    clearDraft: () => void;
}
const useStore = create<Store>((set) => ({
  draft: initialDraft,

  setDraft: (note) => set({ draft: note }),

  clearDraft: () => set({ draft: initialDraft }),
}));


export default useStore;
