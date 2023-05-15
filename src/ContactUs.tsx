
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {  NavLink } from "react-router-dom";
import dalogo from './img/dalogo.png'

export const ContactUs = () => {
  return (
    <div className="bod">
      {/* <header>
      <div className="logo">
          <img src= {dalogo} />
        </div>
        <nav className="navigation">
          <NavLink to="/">Login</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/ContactUs">Contact</NavLink>
        </nav>
      </header> */}

      <div className="wrapper">
        <div className="form-box login">
          <h2>Contact Us</h2>
          {/* <p>You have any questions? Don't hesitate and Contact Us!</p> */}
          <form action="#">
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                <FontAwesomeIcon icon={faUser} />
                </i>{" "}
              </span>
              <input type="text" required />
              <label> Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
               
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </span>
              <input type="text" required />
              <label> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i>
                <FontAwesomeIcon icon={faMessage} />
                </i>
              </span>
              <input type="text" className="message" required/>
              <label> Message</label>
            </div>
            <button type="submit" className="btn">
              Send
            </button>
            <div className="login-register">
              <p>
                <a href="/mainhome" className="register-link">
                  Home
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
