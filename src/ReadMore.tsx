import "./Login.css";

import { NavLink } from "react-router-dom";

import dalogo from "./Dashboard/img/dalogo.png";
import blueAbout from "./Dashboard/img/blueAbout.png";

export const ReadMore = () => {
  return (
    <div className="bod">
      <header>
      <div className="logo">
          <img src= {dalogo} />
        </div>
        <nav className="navigation">
          <NavLink to="/">Login</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/ContactUs">Contact</NavLink>
        </nav>
      </header>

      <div className="about-section">
        <div className="container">
          <div className="content-section">
            <div className="about-title">
              <h3>More About us</h3>
            </div>
            <div className="About-content">
              <p>
              Our advanced
                email classification system uses machine learning algorithms to
                automatically sort and categorize your emails, ensuring that you
                never miss an important message or opportunity. We can help you
                manage your email responses and feedbacks, keeping your
                customers happy and your business running smoothly.
                Our service also includes tools for managing your promotional
                emails. At our core, we are a team of
                dedicated professionals who are passionate about helping
                businesses succeed. We pride ourselves on our exceptional
                customer service and support, and we are committed to providing
                our customers with the best possible experience.
              </p>
              <div className="read-more-button">
                <a href="/About">Back</a>
              </div>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src={blueAbout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
