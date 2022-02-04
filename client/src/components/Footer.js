import { useState } from "react";

import "../styles/Footer.css";

function Footer() {
  const [fr, setFr] = useState(false);

  return (
    <footer>
      <div className="footer_container">
        <div>
          <p>DestCom / ADS Antoine</p>
          <p>Portfolio 2022</p>
        </div>
        <div>
          {fr ? (
            <p>
              <span className="bolder">French version</span> - English version
            </p>
          ) : (
            <p>
              French version - <span className="bolder">English version</span>
            </p>
          )}
        </div>
        <div>
          <p>
            Made by me with <span className="underline">this</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
