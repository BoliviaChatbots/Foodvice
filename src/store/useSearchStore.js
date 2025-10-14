import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      city: "Santa Cruz",
      query: "",
      recentSearches: [], // 🔹 últimas búsquedas

      setCity: (city) => set({ city }),
      setQuery: (query) => set({ query }),

      clearSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "search-storage", // nombre del localStorage
    }
  )
);
