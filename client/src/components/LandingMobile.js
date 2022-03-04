import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { enterAnimMobile } from "../gsapFunction/Landing";

import logo from "../assets/img/logo.svg";
import github from "../assets/img/github.svg";
import linkedin from "../assets/img/linkedin.svg";

import "../styles/LandingMobile.css";

function LandingMobile() {
  const tl = useRef();
  const subtitleRef = useRef();
  const nameRef = useRef();
  const socialIconRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    enterAnimMobile(nameRef, subtitleRef, socialIconRef, tl);
  }, []);

  const goTo = (link, index) => {
    window.open(link, "_newtab" + index);
  };

  return (
    <div id="landing-mobile" className="noselect">
      <div ref={nameRef}>
        <h1>Antoine</h1>
        <h1>AZEVEDO DA SILVA</h1>
      </div>
      <div ref={subtitleRef}>
        <h2>{t("landing.text").toUpperCase()}</h2>
      </div>
      <div className="socials" ref={socialIconRef}>
        <div>
          <img
            src={github}
            alt=""
            onClick={() => goTo("https://github.com/DestroyCom", 12000)}
          />
        </div>
        <div>
          <img
            src={linkedin}
            alt=""
            onClick={() =>
              goTo("https://www.linkedin.com/in/antoine-ads/", 13000)
            }
          />
        </div>
      </div>
      <img src={logo} alt="" />
    </div>
  );
}

export default LandingMobile;
