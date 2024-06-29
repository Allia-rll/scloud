import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Cia } from "../types/models/cia";
import { Folder } from "../components/FolderCard";
import { FileSchema } from "../types/models/files";

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
    { name: "session", storage: createJSONStorage(() => localStorage) }
  )
);

export type FolderCredentials = {
  credentials: Folder[];
};

type FolderCredentialsActions = {
  setCredentials: (credentials: Folder[]) => void;
  updateCredentials: (newcredential: Folder) => void;
};

export const useFCreds = create<FolderCredentials & FolderCredentialsActions>()(
  (set) => ({
    credentials: [],
    setCredentials: (credentials: Folder[]) => set({ credentials }),
    updateCredentials: (newcredential: Folder) =>
      set((state) => ({
        credentials: [...state.credentials, newcredential],
      })),
  })
);

export type FPyto = {
  proyectos: Folder[];
};

type FPytoActions = {
  setProyectos: (proyectos: Folder[]) => void;
  updateProyectos: (newproyecto: Folder) => void;
};

export const useFPyto = create<FPyto & FPytoActions>()((set) => ({
  proyectos: [],
  setProyectos: (proyectos: Folder[]) => set({ proyectos }),
  updateProyectos: (newproyecto: Folder) =>
    set((state) => ({
      proyectos: [...state.proyectos, newproyecto],
    })),
}));

export type FolderCias = {
  fcias: Folder[];
};

type FolderCiasActions = {
  setFCias: (cias: Folder[]) => void;
  updateFCias: (newcia: Folder) => void;
};

export const useFCia = create<FolderCias & FolderCiasActions>()((set) => ({
  fcias: [],
  setFCias: (fcias: Folder[]) => set({ fcias }),
  updateFCias: (newcia: Folder) =>
    set((state) => ({
      fcias: [...state.fcias, newcia],
    })),
}));

export type Files = {
  files: FileSchema[];
};

type FilesActions = {
  setFiles: (files: FileSchema[]) => void;
  updateFiles: (newfile: FileSchema) => void;
};

export const useFiles = create<Files & FilesActions>((set) => ({
  files: [],
  setFiles: (files: FileSchema[]) => set({ files }),
  updateFiles: (newfile: FileSchema) =>
    set((state) => ({
      files: [...state.files, newfile],
    })),
}));

export type Router = {
  params: {
    credential: Folder | undefined;
    cia: Folder | undefined;
    proyecto: Folder | undefined;
  };
};

type RouterActions = {
  setpCred: (credential: Folder) => void;
  setpCia: (cia: Folder) => void;
  setpProyecto: (proyecto: Folder) => void;
  cleanCia: () => void;
  clean: () => void;
};

export const useRouter = create<Router & RouterActions>()(
  persist(
    (set) => ({
      params: { credential: undefined, cia: undefined, proyecto: undefined },
      setpCred: (credential: Folder) =>
        set(() => ({
          params: {
            credential: credential,
            cia: undefined,
            proyecto: undefined,
          },
        })),
      setpCia: (cia: Folder) =>
        set((state) => ({
          params: {
            credential: state.params.credential,
            cia: cia,
            proyecto: undefined,
          },
        })),
      cleanCia: () =>
        set((state) => ({
          params: {
            credential: state.params.credential,
            cia: undefined,
            proyecto: undefined,
          },
        })),
      setpProyecto: (proyecto: Folder) =>
        set((state) => ({
          params: { ...state.params, proyecto: proyecto },
        })),
      clean: () =>
        set(() => ({
          params: {
            credential: undefined,
            cia: undefined,
            proyecto: undefined,
          },
        })),
    }),
    { name: "route", storage: createJSONStorage(() => localStorage) }
  )
);
