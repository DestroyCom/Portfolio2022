import { Routes, Route } from "react-router-dom";

import Index from "./Index";
import Project from "./Project";
import Redirect from "./Redirect";

import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="project/:projectId" element={<Project />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
