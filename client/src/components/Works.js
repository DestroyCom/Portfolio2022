import { useEffect, useState } from "react";

import "../styles/Works.css";

function Works() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("/api/get-project")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, []);

  return (
    <div id="myworks">
      <h2>My works</h2>

      {!projects ? (
        "Loading..."
      ) : (
        <div className="project_box_container">
          {projects.map((project, index) => (
            <div className="project_box_solo" key={"project_box_" + index + 1}>
              <img src="https://destroykeaum.alwaysdata.net/assets/other/mokepon/gameog.png" />
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
