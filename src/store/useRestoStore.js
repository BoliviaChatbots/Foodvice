// src/store/useRestoStore.js
import { create } from "zustand";
import restos from "../data/resto.json";

export const useRestoStore = create((set) => ({
  restaurantes: [],
  sliders: {}, // 👈 nuevo: para guardar los sliders generados

  setRestaurantes: (data) => set({ restaurantes: data }),

  setSliderData: (title, data) =>
    set((state) => ({
      sliders: { ...state.sliders, [title]: data },
    })),

  // Inicializa datos desde el JSON local
  initRestaurantes: () => {
    const restData = restos.map((rest) => ({
      id: rest.id,
      nombre: rest.titulo,
      imagen: rest.imagen,
      estilo: rest.estilo,
      direccion: rest.direccion,
      descripcion: rest.descripcion,
      nivel: rest.nivel,
      rating: rest.rating || "?",
      categoria: rest.categoria || "General",
      prodnombre: rest.comidaNombre || "Los mejores platos",
      prodprecio: rest.comidaPrecio
        ? `${rest.comidaPrecio} bs.`
        : "El mejor precio",
      prodimagen:
        rest.comidaImagen?.trim() !== ""
          ? rest.comidaImagen
          : `/restaurantes/default-food.png`,
      promo: rest.promo,
      tipo: rest.tipo || "", // 👈 agrega esto si vas a filtrar por tipo (japonesa, italiana, etc)
    }));
    set({ restaurantes: restData });
  },
}));
