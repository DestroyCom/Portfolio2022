import axios from "axios";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
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

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.6] };

function Contact({ section3Ref }) {
  const { t } = useTranslation();

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
      <h2>{t("navigation.contact")}</h2>
      <div className="contact_box_container">
        <div className="contact_box_msg">
          <h3>{t("contact.blocOne.title")}</h3>
          <form>
            <div>
              <label>{t("contact.blocOne.fieldOne")}</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div>
              <label>{t("contact.blocOne.fieldTwo")}</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>{t("contact.blocOne.fieldThree")}</label>
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
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={
                  success ? "send-btn success noselect" : "send-btn noselect"
                }
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
                <p>{t("contact.blocOne.sendButton")}</p>
                <img src={sent} alt="sent" className="send-arrow" />
              </motion.div>
            </div>
          </form>
        </div>
        <div className="contact_box_links_container">
          <h3>{t("contact.blocTwo.title")}</h3>
          <div className="contact_box_links" ref={socialLinksRef}>
            {socialLinks && (
              <>
                {socialLinks.map((socialLink, index) => (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={transition}
                    onMouseEnter={() =>
                      onEnterSocial(
                        socialLinksSelector(
                          ".social-link" + index + ">.social-link-text"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(1)"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(2)"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(3)"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.links-img"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.goToSocial"
                        ),
                        socialLinksTimeline,
                        imageLinksTimeline,
                        index
                      )
                    }
                    onMouseLeave={() =>
                      onLeaveSocial(
                        socialLinksSelector(
                          ".social-link" + index + ">.social-link-text"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(1)"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(2)"
                        ),
                        socialLinksSelector(
                          ".social-link" +
                            index +
                            ">.social-link-text>p:nth-child(3)"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.links-img"
                        ),
                        socialLinksSelector(
                          ".social-link" + index + ">.goToSocial"
                        ),
                        socialLinksTimeline,
                        imageLinksTimeline,
                        index
                      )
                    }
                    onClick={() => goTo(socialLink.link, index)}
                    key={"social_links_" + socialLink.platform}
                    className={"social-link" + index + " noselect"}
                  >
                    <div className="social-link-text">
                      <p>{socialLink.platform.toUpperCase()}</p>
                      <p>{socialLink.username}</p>
                      <p>
                        {socialLink.platform.toLowerCase() === "email"
                          ? t("contact.blocTwo.msgTwo")
                          : t("contact.blocTwo.msg")}{" "}
                        {socialLink.platform.toLowerCase()}
                        {socialLink.platform.toLowerCase() === "email"
                          ? ""
                          : ".com"}
                      </p>
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
                  </motion.div>
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
