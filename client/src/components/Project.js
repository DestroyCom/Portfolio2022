import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

import leftArrow from "../assets/img/left-arrow.svg";
import externalLink from "../assets/img/external-link.svg";

import "../styles/Project.css";

function Project() {
  const navigate = useNavigate();
  const projectId = useParams().projectId;
  const [projectData, setProjectData] = useState(null);

  const getUrlAsBlob = (base64, mimetype) => {
    const data = new Buffer(base64 + mimetype, "base64");
    const url = window.URL.createObjectURL(
      new Blob([data], { type: mimetype })
    );
    return url;
  };

  useEffect(() => {
    axios.get(`/api/get-single-project?projectId=${projectId}`).then((res) => {
      console.log(res.data);
      setProjectData(res.data);
    });
  }, []);

  return (
    <>
      {projectData ? (
        <div id="project-id" className={"project-id-" + projectId}>
          <div className="header">
            <div onClick={() => navigate("/")}>
              <img src={leftArrow} />
            </div>
            <h1>{projectData.name}</h1>
          </div>

          <div className="project-img">
            <img
              src={getUrlAsBlob(
                projectData.image_base64,
                projectData.image_mimetype
              )}
              alt={projectData.name}
            />
          </div>

          <div className="content">
            <div className="content-box project-descr">
              <h3>Project description :</h3>
              <p>{projectData.description}</p>

              <div className="btn-project-container">
                <div>
                  <p>SEE THE PROJECT</p>
                </div>
                <img src={externalLink} />
              </div>
            </div>
            <div className="content-box project-specs">
              <div className="tech-box">
                <h3>Tech used :</h3>
                <ul>
                  {projectData.technos.map((tech) => (
                    <li>{tech}</li>
                  ))}
                </ul>
              </div>
              {projectData.team.length >= 2 && (
                <div className="team-box">
                  <h3>Team</h3>
                  <ul>
                    {projectData.team.map((member) => (
                      <li>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="h1-LOADER">LOADING</h1>
      )}
    </>
  );
}

export default Project;
