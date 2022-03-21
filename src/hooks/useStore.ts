import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  listView?: boolean;
  toggleView: (value?: boolean) => void;
  // currentData: (value?: )
}

const useStore = create<IStore>(
  persist(
    devtools((set) => ({
      listView: false,
      toggleView: (value) => {
        return set((state) => ({
          listView: typeof value === "boolean" ? value : !state.listView,
        }));
      },
    })),
    { name: "currentState" }
  )
);

export default useStore;
