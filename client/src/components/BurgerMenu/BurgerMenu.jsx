import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import { motion } from 'framer-motion';
import ImgCross from "../../../public/assets/images/icons/croix.svg";
import { useBurgerMenu } from "../../contexts/BurgerMenuContext";

function BurgerMenu() {

  const { handleCloseMenu, isMenuOpen } = useBurgerMenu();

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2, // Time between each child at closing
        staggerChildren: 0.1, // Reverse animation
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.05, // Time between each child at closing
        staggerDirection: -1, // Reverse animation
      },
    },
  };

  const linkItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 },
  };


  

  return (
    <motion.div 
    initial="closed"
    animate={isMenuOpen ? "open" : "closed"}
    variants={menuVariants}
    className="burger-menu-container">
      <div className="close-button">
        <button
          className="button-cross"
          onClick={handleCloseMenu}
          type="button"
        >
          <img src={ImgCross} alt="Fermer le menu" className="img-cross" />
        </button>
      </div>
      <motion.div
        className="burger-links"
        onClick={handleCloseMenu}
        role="presentation"
        variants={linkVariants}
      >
        <motion.div variants={linkItemVariants}>
          <Link to="/">Accueil</Link>
        </motion.div>
        <motion.div variants={linkItemVariants}>
          <Link to="/oeuvres">Oeuvres</Link>
        </motion.div>
        <motion.div variants={linkItemVariants}>
          <Link to="/carte">Carte</Link>
        </motion.div>
        <motion.div variants={linkItemVariants}>
          <Link to="/classement">Classement</Link>
        </motion.div>
        <motion.div variants={linkItemVariants}>
          <Link to="/a-propos">A propos</Link>
        </motion.div>
        <motion.div variants={linkItemVariants}>
          <Link to="/contact">Contact</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default BurgerMenu;
