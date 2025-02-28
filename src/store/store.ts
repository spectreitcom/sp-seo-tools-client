import { create } from "zustand";

type State = {
  asideMenuOpen: boolean;
};

type Action = {
  toggleAsideMenu: () => void;
};

const initialState: State = {
  asideMenuOpen: false,
};

export const useStore = create<State & Action>((set) => {
  return {
    ...initialState,
    toggleAsideMenu: () =>
      set((state) => ({ asideMenuOpen: !state.asideMenuOpen })),
  };
});
