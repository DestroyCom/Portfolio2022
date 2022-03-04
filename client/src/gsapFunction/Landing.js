import gsap from "gsap";
import { useRef } from "react";

export const enterAnimMobile = (name, sub, icone, tl) => {
  const q = gsap.utils.selector(name);
  const subttlBox = gsap.utils.selector(sub);
  const socialIcon = gsap.utils.selector(icone);

  tl.current = gsap
    .timeline()
    .add("start")
    .from(
      q("h1:first-child"),
      {
        duration: 1.5,
        x: -150,
        ease: "power4",
        stagger: 0.1,
      },
      "start"
    )
    .from(
      q("h1:last-child"),
      {
        duration: 1.5,
        x: -150,
        ease: "power4",
        stagger: 0.1,
      },
      "start"
    )
    .fromTo(
      subttlBox("h2"),
      {
        opacity: 0,
        x: -100,
        ease: "power4",
      },
      { duration: 2, opacity: 1, x: 0, ease: "power4" },
      "start"
    )
    .fromTo(
      socialIcon("div:first-child>img"),
      {
        opacity: 0,
        y: 100,
        ease: "power4",
      },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: "power4",
        stagger: 0.1,
      },
      "start"
    )
    .fromTo(
      socialIcon("div:last-child>img"),
      {
        opacity: 0,
        y: 100,
        ease: "power4",
      },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: "power4",
        stagger: 0.1,
      },
      "start"
    );
};
