import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const BurgerMenuContext = createContext();

export function BurgerMenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const contextValue = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
      handleOpenMenu,
      handleCloseMenu,
    }),
    [isMenuOpen]
  );

  return (
    <BurgerMenuContext.Provider value={contextValue}>
      {children}
    </BurgerMenuContext.Provider>
  );
}

BurgerMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBurgerMenu = () => useContext(BurgerMenuContext);
