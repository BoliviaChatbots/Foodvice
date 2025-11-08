// src/store/useReservaStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useReservaStore = create(
  persist(
    (set) => ({
      fecha: "",
      hora: "",
      personas: "",
      restauranteId: null, // opcional: guardar a qué restaurante corresponde la reserva
      setFecha: (fecha) => set({ fecha }),
      setHora: (hora) => set({ hora }),
      setPersonas: (personas) => set({ personas }),
      setRestauranteId: (id) => set({ restauranteId: id }),
      resetReserva: () =>
        set({ fecha: "", hora: "", personas: "", restauranteId: null }),
    }),
    {
      name: "reserva-storage",
    }
  )
);
