import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface IStore {
  listView?: boolean;
  toggleView: (value?: boolean) => void;
  currentPage: number;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  carousel: {
    id: number;
    image: string;
    bg: string;
  }[];
  addCarousel: (id: number, image: string, bg: string) => void;
  removeCarouseItem: () => void;
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
      loading: false,
      setLoading: (value: boolean) => {
        return set({ loading: value });
      },
      currentPage: 1,
      setCurrentPage: (value) => {
        return set({ currentPage: value });
      },
      carousel: [],
      addCarousel: (id, image, bg) => {
        return set((state) => ({
          // ...state.carousel,
          carousel: [
            ...state.carousel,
            {
              id,
              image,
              bg,
            },
          ],
        }));
      },
      removeCarouseItem: () => {
        return set({ carousel: [] });
      },
    })),
    { name: "useStore" }
  )
);

export default useStore;
