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
              <p>
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
                dictum felis eu pede mollis pretium. Integer tincidunt. Cras
                dapibus. Vivamus elementum semper nisi. Aenean vulputate
                eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                Nam eget dui."
              </p>

              <div className="btn-project-container">
                <div>
                  <p>SEE THE PROJECT</p>
                </div>
                <img src={externalLink} />
              </div>
            </div>
            <div className="content-box project-specs">
              <div>
                <h3>Tech used :</h3>
                <ul>
                  {projectData.technos.map((tech) => (
                    <li>{tech}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Team</h3>
                {projectData.team.length <= 1 ? (
                  <></>
                ) : (
                  <ul>
                    {projectData.team.map((member) => (
                      <li>{member}</li>
                    ))}
                  </ul>
                )}
              </div>
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
