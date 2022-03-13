import { useEffect, useState, useRef } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { toOtherPage } from "../gsapFunction/Works";

import "../styles/Works.css";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.6] };

function Works({ section1Ref, setProjectData }) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [projects, setProjects] = useState(null);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("/api/get-project")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
        if (!isBigScreen)
          setWidth(
            carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
          );
      });
  }, []);

  const getUrlAsBlob = (base64, mimetype) => {
    const data = new Buffer(base64 + mimetype, "base64");
    const url = window.URL.createObjectURL(
      new Blob([data], { type: mimetype })
    );
    return url;
  };

  const handleClick = (id, index) => {
    setProjectData(projects[index]);
    sessionStorage.setItem("projectData", JSON.stringify(projects[index]));
    navigate("/project/" + id);
  };

  return (
    <div id="myworks" ref={section1Ref}>
      <h2>{t("navigation.works")}</h2>

      {!isBigScreen ? (
        <>
          {projects ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
              className="project_box_container_mobile"
            >
              <motion.div
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="project_box_container_mobile_inner"
                ref={carouselRef}
              >
                {projects.map((project, index) => (
                  <div
                    className="project_box_solo_mobile"
                    key={"project_box_" + index + 1}
                    onClick={() => handleClick(project.id, index)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      transition={transition}
                    >
                      <motion.img
                        src={getUrlAsBlob(
                          project.image_base64,
                          project.image_mimetype
                        )}
                        alt={"project_" + index + 1}
                      />
                    </motion.div>
                    <motion.p exit={{ opacity: 0 }} transition={transition}>
                      {index + 1} - {project.name}
                    </motion.p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <div className="project_box_container_mobile">
              <h1>CHARGEMENT</h1>
            </div>
          )}
        </>
      ) : (
        <>
          {projects ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
              className="project_box_container"
            >
              {projects.map((project, index) => (
                <div
                  className="project_box_solo"
                  key={"project_box_" + index + 1}
                  onClick={() => handleClick(project.id, index)}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    transition={transition}
                    src={getUrlAsBlob(
                      project.image_base64,
                      project.image_mimetype
                    )}
                    alt={"project_" + index + 1}
                  />
                  <motion.p exit={{ opacity: 0 }} transition={transition}>
                    {index + 1} - {project.name}
                  </motion.p>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="project_box_container">
              <h1>CHARGEMENT</h1>
            </div>
          )}
        </>
      )}
      <p className="old-works">
        {t("works.textOne")}{" "}
        <a href="https://github.com/DestroyCom" alt="GitHub" target="blank">
          {t("works.textTwo")}
        </a>{" "}
        {t("works.textThree")}{" "}
        <a
          href="https://destroykeaum.alwaysdata.net/realisation.php"
          alt="portfolio V1"
          target="blank"
        >
          {t("works.textFour")}
        </a>{" "}
        .
      </p>
    </div>
  );
}

export default Works;
