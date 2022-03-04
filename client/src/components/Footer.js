import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import "../styles/Footer.css";

function Footer() {
  const { i18n, t } = useTranslation();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {isBigScreen ? (
        <footer>
          <div className="footer_container">
            <div>
              <p>DestCom / ADS Antoine</p>
              <p>Portfolio 2022</p>
            </div>
            <div>
              <motion.p
                initial={{ opacity: 1 }}
                whileTap={
                  i18n.resolvedLanguage === "en" && { scale: 0.9, opacity: 0.5 }
                }
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === "fr" ? "bold" : "normal",
                }}
                className={
                  i18n.resolvedLanguage === "en"
                    ? "pointerFooter noselect"
                    : "noselect"
                }
                onClick={() => i18n.changeLanguage("fr")}
              >
                {t("footer.textTwo.langOne")}
              </motion.p>
              <p className="noselect"> - </p>
              <motion.p
                initial={{ opacity: 1 }}
                whileTap={
                  i18n.resolvedLanguage === "fr" && { scale: 0.9, opacity: 0.5 }
                }
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === "en" ? "bold" : "normal",
                }}
                className={
                  i18n.resolvedLanguage === "fr"
                    ? "pointerFooter noselect"
                    : "noselect"
                }
                onClick={() => i18n.changeLanguage("en")}
              >
                {t("footer.textTwo.langTwo")}
              </motion.p>
            </div>
            <div>
              <p>
                {t("footer.textThree.partOne")}{" "}
                <span className="underline">
                  {t("footer.textThree.partTwo")}
                </span>
              </p>
            </div>
          </div>
        </footer>
      ) : (
        <footer>
          <div className="footer_container">
            <div>
              <p>DestCom / ADS Antoine</p>
              <p>Portfolio 2022</p>
            </div>
            <div
              onClick={() => {
                i18n.resolvedLanguage === "en"
                  ? i18n.changeLanguage("fr")
                  : i18n.changeLanguage("en");
              }}
            >
              {i18n.resolvedLanguage === "fr" ? (
                <>{t("footer.textTwo.langTwo")}</>
              ) : (
                <>{t("footer.textTwo.langOne")}</>
              )}
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
