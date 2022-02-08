import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useState, useRef } from "react";
import { validEmailRegex, whiteSpace } from "../regex/Regex";

import {
  onLeaveMsg,
  onEnterMsg,
  onSendMsg,
  afterSendMsg,
  onEnterSocial,
  onLeaveSocial,
  onClickSocial,
} from "../gsapFunction/Contact";

import twitter from "../assets/img/twitter.svg";
import github from "../assets/img/github.svg";
import mailImg from "../assets/img/envelope-solid.svg";
import linkedin from "../assets/img/linkedin.svg";
import sent from "../assets/img/sent.svg";
import externalLink from "../assets/img/external-link.svg";

import "../styles/Contact.css";

function Contact({ section3Ref }) {
  //GSAP animation refs and timeline for contact form
  const sendMsg = useRef(null);
  const sendMessageSelector = gsap.utils.selector(sendMsg);
  const msgTimeline = gsap.timeline({ repeat: -1 });
  const sendMsgTimeline = gsap.timeline();

  //GSAP animation refs and timeline for social links
  const socialLinksRef = useRef(null);
  const socialLinksSelector = gsap.utils.selector(socialLinksRef);
  const [socialLinksTimeline, setSocialLinksTimeline] = useState([]);
  const [imageLinksTimeline, setImageLinksTimeline] = useState([]);

  //States for contact form
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [socialLinks, setSocialLinks] = useState(false);

  //Get social links from backend
  useEffect(() => {
    axios.get("/api/get-social-links").then((res) => {
      setSocialLinks(res.data);
    });
  }, []);

  useEffect(() => {
    let tmpTimeline = [];
    for (let i = 0; i < socialLinks.length; i++) {
      tmpTimeline[i] = gsap.timeline();
    }
    setSocialLinksTimeline(tmpTimeline);

    let tmpImageTimeline = [];
    for (let i = 0; i < socialLinks.length; i++) {
      tmpImageTimeline[i] = gsap.timeline();
    }
    setImageLinksTimeline(tmpImageTimeline);
  }, [socialLinks]);

  //Function to open social links
  const goTo = (link, index) => {
    onClickSocial(".social-link" + index, gsap.timeline());
    setTimeout(() => {
      window.open(link, "_newtab" + index);
    }, 500);
  };

  //Verifiy field then send message to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    msgTimeline.pause();
    if (success) return;

    setError(false);

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

      onSendMsg(sendMessageSelector(".send-btn>.send-arrow"), sendMsgTimeline);

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

      setTimeout(
        () =>
          afterSendMsg(
            sendMessageSelector(".send-btn>.send-arrow"),
            sendMsgTimeline,
            msgTimeline
          ),
        2000
      );
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
            <div className="actions-form" ref={sendMsg}>
              {error && (
                <p className="error">
                  Error :<br /> {error}
                </p>
              )}
              {success && <p> Your message has been sent !</p>}
              <div
                className={success ? "send-btn success" : "send-btn"}
                onClick={(e) => handleSubmit(e)}
                onMouseEnter={() =>
                  onEnterMsg(
                    sendMessageSelector(".send-btn>.send-arrow"),
                    msgTimeline,
                    success
                  )
                }
                onMouseLeave={() =>
                  onLeaveMsg(
                    sendMessageSelector(".send-btn>.send-arrow"),
                    msgTimeline,
                    success
                  )
                }
              >
                <p>Send</p>
                <img src={sent} alt="sent" className="send-arrow" />
              </div>
            </div>
          </form>
        </div>
        <div className="contact_box_links_container">
          <h3>Let's keep in touch</h3>
          <div className="contact_box_links" ref={socialLinksRef}>
            {socialLinks && (
              <>
                {socialLinks.map((socialLink, index) => (
                  <div
                    onMouseEnter={() =>
                      onEnterSocial(
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:first-child"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:last-child"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.links-img"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.goToSocial"
                        ),
                        socialLinksTimeline[index],
                        imageLinksTimeline[index]
                      )
                    }
                    onMouseLeave={() =>
                      onLeaveSocial(
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:first-child"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:last-child"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.links-img"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.goToSocial"
                        ),
                        socialLinksTimeline[index],
                        imageLinksTimeline[index]
                      )
                    }
                    onClick={() => goTo(socialLink.link, index)}
                    key={"social_links_" + socialLink.platform}
                    className={"social-link" + index}
                  >
                    <div className="social-link-text">
                      <p>{socialLink.platform.toUpperCase()}</p>
                      <p>{socialLink.username}</p>
                    </div>
                    {socialLink.icone.toLowerCase() === "github" && (
                      <img
                        src={github}
                        alt={socialLink.platform}
                        className="links-img"
                      />
                    )}
                    {socialLink.icone.toLowerCase() === "linkedin" && (
                      <img
                        src={linkedin}
                        alt={socialLink.platform}
                        className="links-img"
                      />
                    )}
                    {socialLink.icone.toLowerCase() === "twitter" && (
                      <img
                        src={twitter}
                        alt={socialLink.platform}
                        className="links-img"
                      />
                    )}
                    {socialLink.icone.toLowerCase() === "envelope-solid" && (
                      <img
                        src={mailImg}
                        alt={socialLink.platform}
                        className="links-img"
                      />
                    )}
                    <img
                      src={externalLink}
                      alt={"go-to-" + socialLink.platform}
                      className="goToSocial"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
