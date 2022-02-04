import logo from "../assets/img/logo.svg";

import "../styles/Landing.css";

function Landing() {
  return (
    <div id="landing">
      <div className="name">
        <h1>Antoine</h1>
        <h1>AZEVEDO DA SILVA</h1>
      </div>
      <div className="subtitle">
        <h2>WEB DEVELOPER</h2>
      </div>
      <img src={logo} alt="" />
    </div>
  );
}

export default Landing;
