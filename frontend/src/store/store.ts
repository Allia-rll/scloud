import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Cia } from "../types/models/cia";

type Session = {
  cia: Cia | null;
};

type Store = {
  session: Session;
};

type StoreActions = {
  setSession: (session: Session) => void;
};

export const useStore = create<Store & StoreActions>()(
  persist(
    (set) => ({
      session: { cia: null },
      setSession: (session: Session) => set({ session }),
    }),
    { name: "session", storage: createJSONStorage(() => sessionStorage) }
  )
);
