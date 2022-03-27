import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  listView?: boolean;
  toggleView: (value?: boolean) => void;
  currentPage: number;
  isFiltered: boolean;
  filterTypes: string[];
  removeFilterTpyes: (value: string) => void;
  setFilterTypes: (value: string) => void;
  setIsFiltered: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  carousel: {
    id: number;
    image: string;
    bg: string;
  }[];
  addCarousel: (id: number, image: string, bg: string) => void;
  removeCarouseItem: () => void;
}

interface IUserAccount {
  points: number;
  addPoints: (value: number) => void;
  deductPoints: (value: number) => void;
  collections: {
    id: number;
    image: string;
    bg: string;
  }[];
  addCollections: (id: number, image: string, bg: string) => void;
}

const useStore = create<IStore & IUserAccount>(
  persist(
    devtools((set) => ({
      listView: false,
      toggleView: (value) => {
        return set((state) => ({
          listView: typeof value === "boolean" ? value : !state.listView,
        }));
      },
      isFiltered: false,
      setIsFiltered: (value: boolean) => {
        return set({ isFiltered: value });
      },
      currentPage: 1,
      setCurrentPage: (value) => {
        return set({ currentPage: value });
      },
      carousel: [],
      addCarousel: (id, image, bg) => {
        return set((state) => ({
          carousel: [
            {
              id,
              image,
              bg,
            },
            ...state.carousel.filter((object) => {
              return object.id !== id;
            }),
          ],
        }));
      },
      removeCarouseItem: () => {
        return set({ carousel: [] });
      },
      filterTypes: [],
      setFilterTypes: (value) => {
        return set((state) => ({
          ...state,
          filterTypes: [value.toLocaleLowerCase(), ...state.filterTypes],
        }));
      },
      removeFilterTpyes: (value) => {
        return set((state) => ({
          ...state,
          filterTypes: state.filterTypes.filter((item) => item !== value),
        }));
      },
      collections: [],
      addCollections: (id, image, bg) => {
        return set((state) => ({
          collections: [
            ...state.collections.filter((obj) => obj.id !== id),
            {
              id,
              image,
              bg,
            },
          ],
        }));
      },
      points: 2000,
      addPoints: (value) => {
        return set((state) => ({
          points: state.points + value,
        }));
      },
      deductPoints: (value) => {
        return set((state) => ({
          points: state.points - value,
        }));
      },
    })),
    { name: "useStore" }
  )
);

export default useStore;
