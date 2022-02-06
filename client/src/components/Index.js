import { useRef } from "react";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Works from "./Works";
import Me from "./Me";
import Contact from "./Contact";
import Footer from "./Footer";

function Index() {
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();

  return (
    <div className="App">
      <Navbar
        section1Ref={section1Ref}
        section2Ref={section2Ref}
        section3Ref={section3Ref}
      />
      <Landing />
      <Works section1Ref={section1Ref} />
      <Me section2Ref={section2Ref} />
      <Contact section3Ref={section3Ref} />
      <Footer />
    </div>
  );
}

export default Index;
