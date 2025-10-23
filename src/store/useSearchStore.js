import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      // 🔹 Búsqueda general
      city: "Santa Cruz",
      query: "",
      recentSearches: [],
      setCity: (city) => set({ city }),
      setQuery: (query) => set({ query }),
      clearSearches: () => set({ recentSearches: [] }),

      // 🔹 Filtros
      priceRange: 50,
      level: 0,
      cuisine: "",
      distance: "100 metros",
      setPriceRange: (val) => set({ priceRange: val }),
      setLevel: (val) => set({ level: val }),
      setCuisine: (val) => set({ cuisine: val }),
      setDistance: (val) => set({ distance: val }),
    }),
    {
      name: "search-storage", // Nombre del localStorage
    }
  )
);
