import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Index from "./Index";
import Project from "./Project";
import Redirect from "./Redirect";
import Lang from "./Lang";

import "../styles/App.css";

function App() {
  const [workSection, setWorkSection] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence initial={false} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route
            path="project/:projectId"
            element={
              <Project
                projectData={projectData}
                setProjectData={setProjectData}
                setWorkSection={setWorkSection}
              />
            }
          />
          <Route exact path="lang/:projectId" element={<Lang />} />
          <Route
            exact
            path="/"
            element={
              <Index
                projectData={projectData}
                setProjectData={setProjectData}
                workSection={workSection}
                setWorkSection={setWorkSection}
              />
            }
          />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
