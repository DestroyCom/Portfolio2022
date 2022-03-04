import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";

import exit from "../assets/img/exit.svg";
import menu from "../assets/img/menu.svg";

import "../styles/NavbarMobile.css";

function NavbarMobile({ section1Ref, section2Ref, section3Ref }) {
  const { t } = useTranslation();

  const [toggleMenu, setToggleMenu] = useState(false);

  const executeScroll = (ref) => {
    console.log(ref);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav id="navMobile" className="noselect">
      <div>
        {toggleMenu ? (
          <motion.img
            src={exit}
            alt=""
            onClick={() => toggleNav()}
            whileTap={{ opacity: 0.25 }}
          />
        ) : (
          <motion.img
            src={menu}
            alt=""
            onClick={() => toggleNav()}
            whileTap={{ opacity: 0.25 }}
          />
        )}
      </div>

      {toggleMenu && (
        <div className="menuOpen">
          <div onClick={() => executeScroll(section1Ref)}>
            <p>{t("navigation.works").toUpperCase()}</p>
            <div className="nav_underline" />
          </div>
          <div onClick={() => executeScroll(section2Ref)}>
            <p>{t("navigation.about").toUpperCase()}</p>
            <div className="nav_underline" />
          </div>
          <div onClick={() => executeScroll(section3Ref)}>
            <p>{t("navigation.contact").toUpperCase()}</p>
            <div className="nav_underline" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarMobile;
