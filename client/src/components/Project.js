import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Buffer } from "buffer";
import { useTranslation } from "react-i18next";

import leftArrow from "../assets/img/left-arrow.svg";
import externalLink from "../assets/img/external-link.svg";
import gitSquare from "../assets/img/git_square.svg";

import "../styles/Project.css";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

function Project({ projectData, setProjectData, setWorkSection }) {
  const navigate = useNavigate();
  const projectId = useParams().projectId;
  const { t, i18n } = useTranslation();

  const getUrlAsBlob = (base64, mimetype) => {
    let data = new Buffer(base64 + mimetype, "base64");
    return window.URL.createObjectURL(new Blob([data], { type: mimetype }));
  };

  const goTo = (link, index) => {
    console.log(link, index);
    setTimeout(() => {
      window.open(link, "_newtab" + index);
    }, 500);
  };

  console.log(projectData);

  useEffect(() => {
    setWorkSection(true);

    if (projectData === null) {
      setProjectData(JSON.parse(sessionStorage.getItem("projectData")));
    }
  }, []);

  return (
    <>
      {projectData ? (
        <motion.div
          id="project-id"
          className={"project-id-" + projectId}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="header">
            <motion.div
              whileTap={{ opacity: 0.5, scale: 0.9 }}
              onClick={() => navigate(-1)}
            >
              <img src={leftArrow} alt="back-arrow" />
            </motion.div>
            {i18n.resolvedLanguage === "fr" ? (
              <h1>{projectData.name}</h1>
            ) : (
              <h1>{projectData.name}</h1>
            )}
          </div>

          <motion.div
            className="project-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={getUrlAsBlob(
                projectData.image_base64,
                projectData.image_mimetype
              )}
              alt={projectData.name}
            />
          </motion.div>

          <motion.div
            className="content"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="content-box project-descr">
              <h3>{t("project.textOne")}</h3>
              {i18n.resolvedLanguage === "fr" ? (
                <p>{projectData.description_fr}</p>
              ) : (
                <p>{projectData.description_en}</p>
              )}

              {(projectData.url || projectData.github) && (
                <h4>{t("project.textTwo")}</h4>
              )}

              <div className="linksContainer">
                {projectData.url && (
                  <motion.div
                    whileTap={{ scale: 0.99, opacity: 0.5 }}
                    className="btn-project-container noselect"
                    onClick={() => goTo(projectData.url, projectData.id)}
                  >
                    <img src={externalLink} alt="goTo" />
                    <p>{t("project.textSix")}</p>
                  </motion.div>
                )}
                {projectData.github && (
                  <motion.div
                    whileTap={{ scale: 0.99, opacity: 0.5 }}
                    className="btn-project-container noselect"
                    onClick={() => goTo(projectData.github, projectData.id)}
                  >
                    <img src={gitSquare} alt="goTo" />
                    <p>{t("project.textFive")}</p>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="content-box project-specs">
              <div className="tech-box">
                <h3>{t("project.textThree")}</h3>
                <ul>
                  {projectData.technos.map((tech, index) => (
                    <>
                      {tech[1] === null || tech[1] === "|" ? (
                        <li key={index + "-team"}>{tech[0]}</li>
                      ) : (
                        <motion.li
                          whileTap={{ scale: 0.99 }}
                          whileHover={{ opacity: 0.5 }}
                          key={index + "-" + tech + "-teamMotion"}
                          onClick={() => goTo(tech[1], projectData.id + index)}
                          className="pointer"
                        >
                          {tech[0]}
                        </motion.li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
              {projectData.team.length >= 2 && (
                <div className="team-box">
                  <h3>{t("project.textFour")}</h3>
                  <ul>
                    {projectData.team.map((member, index) => (
                      <>
                        {member[1] === null || member[1] === "|" ? (
                          <li key={index + "-member"}>{member[0]}</li>
                        ) : (
                          <motion.li
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ opacity: 0.5 }}
                            key={index + "-" + member + "-memberMotion"}
                            onClick={() =>
                              goTo(member[1], projectData.id + index * 2)
                            }
                            className="pointer"
                          >
                            {member[0]}
                          </motion.li>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <h1 className="h1-LOADER">LOADING</h1>
      )}
    </>
  );
}

export default Project;
