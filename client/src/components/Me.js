import { useTranslation } from "react-i18next";

import profile from "../assets/img/profile.jpg";

import "../styles/Me.css";

function Me({ section2Ref }) {
  const { t } = useTranslation();

  return (
    <div id="aboutme" ref={section2Ref}>
      <h2>{t("about.title")}</h2>
      <div className="about_me_container">
        <div className="about_me_photo">
          <img src={profile} alt="profile" />
        </div>
        <div className="about_me_text">
          <p>{t("about.description.textOne")}</p>
          <p>{t("about.description.textTwo")}</p>
          <p>{t("about.description.textThree")}</p>
          <p>{t("about.description.textFour")}</p>
          <p>{t("about.description.textFive")}</p>
          <p>{t("about.description.textSix")}</p>
        </div>
      </div>
    </div>
  );
}

export default Me;
