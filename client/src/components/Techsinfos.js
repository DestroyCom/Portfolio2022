import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Techsinfo() {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        key="techs"
        id="techsinfo"
      >
        <h2>{t("footer.textModal.madeWith")}</h2>
        <div>
          <p>Figma</p>
          <p className="types">Design</p>
        </div>
        <div>
          <p>Create-React-App (React)</p>
          <p className="types">Front-End</p>
        </div>
        <div>
          <p>Gsap</p>
          <p>Framer Motion</p>
          <p className="types">Animation</p>
        </div>
        <div>
          <p>ExpressJS</p>
          <p className="types">Back-End</p>
        </div>
        <div>
          <p>Heroku</p>
          <p className="types">{t("footer.textModal.hosting")}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Techsinfo;
