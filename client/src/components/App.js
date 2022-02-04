import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Works from "./Works";
import Me from "./Me";
import Contact from "./Contact";
import Footer from "./Footer";

import "../styles/App.css";

function App() {
  /* 
  const [test, setTest] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTest(data);
      });
  }, []); */

  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Works />
      <Me />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
