import twitter from "../assets/img/twitter.svg";
import github from "../assets/img/github.svg";
import mail from "../assets/img/envelope-solid.svg";
import linkedin from "../assets/img/linkedin.svg";

import "../styles/Contact.css";

function Contact() {
  return (
    <div id="contact">
      <h2>Contact</h2>
      <div className="contact_box_container">
        <div className="contact_box_msg">
          <h3>Something to say ?</h3>
          <form>
            <div>
              <label>Your email :</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label>Your name :</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Your message :</label>
              <textarea name="message" />
            </div>
            <div>
              <p>Send</p>
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
              <img src={mail} />
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
