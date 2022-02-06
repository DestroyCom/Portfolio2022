import { gsap } from "gsap";
import { useEffect } from "react";

import "../styles/Navbar.css";

function Navbar({ section1Ref, section2Ref, section3Ref }) {
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
        <p>WORKS</p>
        <div className="nav_underline" />
      </div>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => executeScroll(section2Ref)}
      >
        <p>ABOUT ME</p>
        <div className="nav_underline" />
      </div>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => executeScroll(section3Ref)}
      >
        <p>CONTACT</p>
        <div className="nav_underline" />
      </div>
    </nav>
  );
}

export default Navbar;
