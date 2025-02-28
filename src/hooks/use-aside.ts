import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store.ts";

export const useAside = () => {
  const [toggleAsideMenu, asideMenuOpen] = useStore(
    useShallow((state) => [state.toggleAsideMenu, state.asideMenuOpen]),
  );

  return {
    toggleAsideMenu,
    asideMenuOpen,
  };
};
