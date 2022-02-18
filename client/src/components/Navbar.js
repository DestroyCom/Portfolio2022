import { gsap } from "gsap";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "../styles/Navbar.css";

function Navbar({ section1Ref, section2Ref, section3Ref }) {
  const { t } = useTranslation();
  const executeScroll = (ref) => {
    console.log(ref);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const onEnter = ({ currentTarget }) => {
    console.log(currentTarget);
    const currentTargetSelector = gsap.utils.selector(currentTarget);
    gsap.fromTo(
      currentTargetSelector(".nav_underline"),
      {
        width: "0%",
        left: "0%",
      },
      {
        width: "100%",
        duration: 1,
      }
    );
  };

  const onLeave = ({ currentTarget }) => {
    const currentTargetSelector = gsap.utils.selector(currentTarget);
    gsap.fromTo(
      currentTargetSelector(".nav_underline"),
      {
        width: "100%",
        left: "0%",
      },
      {
        width: "0%",
        duration: 1,
      }
    );
  };

  return (
    <nav className="noselect">
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => executeScroll(section1Ref)}
      >
        <p>{t("navigation.works").toUpperCase()}</p>
        <div className="nav_underline" />
      </div>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => executeScroll(section2Ref)}
      >
        <p>{t("navigation.about").toUpperCase()}</p>
        <div className="nav_underline" />
      </div>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => executeScroll(section3Ref)}
      >
        <p>{t("navigation.contact").toUpperCase()}</p>
        <div className="nav_underline" />
      </div>
    </nav>
  );
}

export default Navbar;
