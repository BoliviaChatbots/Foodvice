import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      city: "1",
      query: "",
      cuisine: "",
      priceStart: 0,
      priceEnd: 200,
      latitude: null,
      longitude: null,
      locationEnabled: false,
      distance: "0",

      // setCity: (city) => set({ city }),
      setCity: (city) => set({ city: String(city) }),
      setQuery: (query) => set({ query }),
      setCuisine: (cuisine) => set({ cuisine }),
      setPriceRange: (min, max) => set({ priceStart: min, priceEnd: max }),

      // 🔹 Ubicación
      setLocation: (lat, lon) =>
        set({ latitude: lat, longitude: lon, locationEnabled: true }),
      clearLocation: () =>
        set({ latitude: null, longitude: null, locationEnabled: false }),
      setDistance: (distance) => set({ distance }),
    }),
    {
      name: "search-storage",
    }
  )
);
