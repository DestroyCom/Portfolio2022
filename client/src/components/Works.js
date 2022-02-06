import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

import "../styles/Works.css";

function Works({ section1Ref }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("/api/get-project")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, []);

  const getUrlAsBlob = (base64, mimetype) => {
    const data = new Buffer(base64 + mimetype, "base64");
    const url = window.URL.createObjectURL(
      new Blob([data], { type: mimetype })
    );
    return url;
  };

  return (
    <div id="myworks" ref={section1Ref}>
      <h2>My works</h2>

      {!projects ? (
        "Loading..."
      ) : (
        <div className="project_box_container">
          {projects.map((project, index) => (
            <div
              className="project_box_solo"
              key={"project_box_" + index + 1}
              onClick={() => navigate("/project/" + project.id)}
            >
              <img
                src={getUrlAsBlob(project.image_base64, project.image_mimetype)}
                alt={"project_" + index + 1}
              />
              <p>
                {index + 1} - {project.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Works;
