import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isOpen: false,
  openLogin: () => set({ isOpen: true }),
  closeLogin: () => set({ isOpen: false }),
}));
