import axios from "axios";
import { useState } from "react";
import { validEmailRegex, whiteSpace } from "./Regex";

import twitter from "../assets/img/twitter.svg";
import github from "../assets/img/github.svg";
import mailImg from "../assets/img/envelope-solid.svg";
import linkedin from "../assets/img/linkedin.svg";
import sent from "../assets/img/sent.svg";

import "../styles/Contact.css";

function Contact({ section3Ref }) {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (success) return;

    setError(false);

    console.log(name, mail, message);

    if (mail !== "" || name !== "" || message !== "") {
      if (
        mail.match(whiteSpace) ||
        name.match(whiteSpace) ||
        message.match(whiteSpace)
      ) {
        setError("Please fill in all the fields");
        return;
      }

      if (!validEmailRegex.test(mail)) {
        setError("Votre email n'est pas valide");
        return;
      }

      if (message.length < 10) {
        setError("Votre message doit contenir au moins 10 caractères");
        return;
      }

      axios
        .post("/api/sent-message", {
          name: name,
          mail: mail,
          message: message,
        })
        .then(function (response) {
          console.log(response.data);
          setSuccess(true);
        })
        .catch(function (error) {
          console.log(error);
          setError("Une erreur est survenue");
        });
    } else {
      if (!mail || mail === "") {
        setError("Veuillez entrer une adresse mail");
      } else if (!name || name === "") {
        setError("Veuillez entrer un nom");
      } else if (!message || message === "") {
        setError("Veuillez entrer un message");
      }
    }
  };

  return (
    <div id="contact" ref={section3Ref}>
      <h2>Contact</h2>
      <div className="contact_box_container">
        <div className="contact_box_msg">
          <h3>Something to say ?</h3>
          <form>
            <div>
              <label>Your email :</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div>
              <label>Your name :</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Your message :</label>
              <textarea
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="actions-form">
              {error && (
                <p className="error">
                  Error :<br /> {error}
                </p>
              )}
              {success && <p> Your message has been sent !</p>}
              <div
                className={success ? "send-btn success" : "send-btn"}
                onClick={(e) => handleSubmit(e)}
              >
                <p>Send</p>
                <img src={sent} alt="sent" />
              </div>
            </div>
          </form>
        </div>
        <div className="contact_box_links_container">
          <h3>Let's keep in touch</h3>
          <div className="contact_box_links">
            <div>
              <div>
                <p>LINKEDIN</p>
                <p>Antoine Azevedo Da Silva</p>
              </div>
              <img src={linkedin} />
            </div>
            <div>
              <div>
                <p>GITHUB</p>
                <p>Destroycom</p>
              </div>
              <img src={github} />
            </div>
            <div>
              <div>
                <p>EMAIL</p>
                <p>antoine.azevedo-da-silva@hetic.net</p>
              </div>
              <img src={mailImg} />
            </div>
            <div>
              <div>
                <p>TWITTER</p>
                <p>@ADSantoine</p>
              </div>
              <img src={twitter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
