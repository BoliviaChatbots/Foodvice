import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoginStore = create(
  persist(
    (set) => ({
      // datos
      user: null,
      token: null,

      // modales UI (no deberían persistir)
      isOpenLogin: false,
      isOpenRegister: false,
      isOpenAvatar: false,
      isOpenEditUser: false,

      // status
      isLoading: false,
      error: null,

      // UI actions
      openEditUser: () => set({ isOpenEditUser: true }),
      closeEditUser: () => set({ isOpenEditUser: false }),
      openAvatar: () => set({ isOpenAvatar: true }),
      closeAvatar: () => set({ isOpenAvatar: false }),
      openLogin: () => set({ isOpenLogin: true, isOpenRegister: false }),
      closeLogin: () => set({ isOpenLogin: false }),
      openRegister: () => set({ isOpenRegister: true, isOpenLogin: false }),
      closeRegister: () => set({ isOpenRegister: false }),

      // Auth actions (simulación; luego reemplazas con fetch)
      loginUser: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // simula llamada al backend
          await new Promise((r) => setTimeout(r, 700));

          // lógica de ejemplo (reemplazar por llamada real)
          if (email === "demo@gmail.com" && password === "12345") {
            const user = {
              name: "Gualberto Alex",
              email,
              avatar: "https://i.pravatar.cc/150?u=" + email,
            };
            const token = Math.random().toString(36).substring(2);
            set({ user, token, isOpenLogin: false });
            return { success: true, user };
          } else {
            throw new Error("Correo o contraseña incorrectos");
          }
        } catch (err) {
          set({ error: err.message || "Error en login" });
          return { success: false, message: err.message };
        } finally {
          set({ isLoading: false });
        }
      },

      registerUser: async ({ email, phone, name, lastName }) => {
        set({ isLoading: true, error: null });
        try {
          // simula llamada al backend
          await new Promise((r) => setTimeout(r, 700));

          if (!email || !phone) throw new Error("Email y celular obligatorios");

          const user = {
            name: name
              ? `${name} ${lastName || ""}`.trim()
              : email.split("@")[0],
            email,
            avatar: "https://i.pravatar.cc/150?u=" + email,
          };
          const token = Math.random().toString(36).substring(2);

          // guardar y cerrar register
          set({ user, token, isOpenRegister: false });
          return { success: true, user };
        } catch (err) {
          set({ error: err.message || "Error en registro" });
          return { success: false, message: err.message };
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "user-auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }), // sólo persistimos user/token
    }
  )
);

export default useLoginStore;
