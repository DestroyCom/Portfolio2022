import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Works from "./Works";
import Me from "./Me";
import Contact from "./Contact";
import Footer from "./Footer";

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

function Index({ projectData, setProjectData, workSection, setWorkSection }) {
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();

  useEffect(() => {
    if (workSection) {
      section1Ref.current.scrollIntoView({});
      setWorkSection(false);
    }
  }, []);

  return (
    <motion.div
      id="index"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <Navbar
        section1Ref={section1Ref}
        section2Ref={section2Ref}
        section3Ref={section3Ref}
      />
      <Landing />
      <Works section1Ref={section1Ref} setProjectData={setProjectData} />
      <Me section2Ref={section2Ref} />
      <Contact section3Ref={section3Ref} />
      <Footer />
    </motion.div>
  );
}

export default Index;
