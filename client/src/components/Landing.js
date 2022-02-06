import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import logo from "../assets/img/logo.svg";

import "../styles/Landing.css";

function Landing() {
  const subtitleRef = useRef();
  const nameRef = useRef();
  const tl = useRef();

  useEffect(() => {
    const q = gsap.utils.selector(nameRef);
    const subttlBox = gsap.utils.selector(subtitleRef);

    gsap.fromTo(
      subttlBox("h2"),
      {
        opacity: 0,
        ease: "power4",
      },
      { duration: 2, opacity: 1, ease: "power4" }
    );

    tl.current = gsap
      .timeline()
      .from(q("h1:first-child"), {
        duration: 1.5,
        y: 250,
        ease: "power4",
        stagger: 0.1,
      })
      .from(q("h1:last-child"), {
        duration: 1.5,
        y: 250,
        ease: "power4",
        stagger: 0.1,
        delay: -1,
      });
  }, []);

  return (
    <div id="landing" className="noselect">
      <div className="name" ref={nameRef}>
        <h1>Antoine</h1>
        <h1>AZEVEDO DA SILVA</h1>
      </div>
      <div className="subtitle" ref={subtitleRef}>
        <h2>WEB DEVELOPER</h2>
      </div>
      <img src={logo} alt="" />
    </div>
  );
}

export default Landing;
