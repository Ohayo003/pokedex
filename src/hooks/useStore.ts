import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  listView?: boolean;
  toggleView: (value?: boolean) => void;
  filterTypes: string[];
  removeFilterTpyes: (value: string) => void;
  setFilterTypes: (value: string) => void;
  carousel: {
    id: number;
    image: string;
    bg: string;
  }[];
  loading: boolean;
  setLoading: (value: boolean) => void;
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
    operation?: "increment" | "decrement"
  ) => void;
  setCurrentLastIndex: (
    value: number,
    operation?: "increment" | "decrement"
  ) => void;
  setCurrentPage: (value: number) => void;
}

interface IUserAccount {
  points: number;
  updatePoints: (value: number, operation: "increment" | "decrement") => void;
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
      loading: false,
      setLoading: (value) => {
        return set({ loading: value });
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
          currentIndex: operation
            ? operation === "increment"
              ? state.currentIndex + value
              : state.currentIndex - value
            : value,
        }));
      },
      setCurrentLastIndex: (value, operation) => {
        return set((state) => ({
          currentLastIndex: operation
            ? operation === "increment"
              ? state.currentLastIndex + value
              : state.currentLastIndex - value
            : value,
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
            operation === "increment"
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
