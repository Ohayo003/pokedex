import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  listView?: boolean;
  toggleView: (value?: boolean) => void;
  isFiltered: boolean;
  filterTypes: string[];
  removeFilterTpyes: (value: string) => void;
  setFilterTypes: (value: string) => void;
  setIsFiltered: (value: boolean) => void;
  carousel: {
    id: number;
    image: string;
    bg: string;
  }[];
  addCarousel: (id: number, image: string, bg: string) => void;
  removeCarouseItem: () => void;
  clearStore: () => void;
}

///interface for pagination
interface IPagination {
  currentPage: number;
  currentIndex: number;
  currentLastIndex: number;
  setCurrentIndex: (
    value: number,
    operation: "increament" | "decreament"
  ) => void;
  setCurrentLastIndex: (
    value: number,
    operation: "increament" | "decreament"
  ) => void;
  setCurrentPage: (value: number) => void;
}

interface IUserAccount {
  points: number;
  updatePoints: (value: number, operation: "increament" | "decreament") => void;
  collections: {
    id: number;
    name: string;
    image: string;
    bg: string;
  }[];
  addCollections: (id: number, name: string, image: string, bg: string) => void;
  removeCollection: (id: number) => void;
}

const useStore = create<IStore & IUserAccount & IPagination>(
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
      currentIndex: 0,
      currentLastIndex: 10,
      setCurrentIndex: (value, operation) => {
        return set((state) => ({
          currentIndex:
            operation === "increament"
              ? state.currentIndex + value
              : state.currentIndex - value,
        }));
      },
      setCurrentLastIndex: (value, operation) => {
        return set((state) => ({
          currentLastIndex:
            operation === "increament"
              ? state.currentLastIndex + value
              : state.currentLastIndex - value,
        }));
      },
      removeFilterTpyes: (value) => {
        return set((state) => ({
          ...state,
          filterTypes: state.filterTypes.filter((item) => item !== value),
        }));
      },
      collections: [],
      addCollections: (id, name, image, bg) => {
        return set((state) => ({
          collections: [
            ...state.collections.filter((obj) => obj.id !== id),
            {
              id,
              name,
              image,
              bg,
            },
          ],
        }));
      },
      removeCollection: (id) => {
        return set((state) => ({
          collections: [
            ...state.collections.filter((obj) => {
              return obj.id !== id;
            }),
          ],
        }));
      },
      points: 0,
      updatePoints: (value, operation) => {
        return set((state) => ({
          points:
            operation === "increament"
              ? state.points + value
              : state.points - value,
        }));
      },
      clearStore: () => {
        return set({}, true);
      },
    })),
    { name: "useStore" }
  )
);

export default useStore;
