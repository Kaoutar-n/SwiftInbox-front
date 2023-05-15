
import "./Login.css";

import Feature from "./feature/Feature";
import './about.css'
export const About = () => {

  return (
    <>
      <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
      <div className="gpt3__whatgpt3-feature">
        <Feature title='What is SwiftInbox' text='      Welcome to our email classification service! We specialize in
                helping businesses manage their email responses and feedbacks
                for their publicity or offers. We understand the importance of
                staying on top of your email communication, especially when it
                comes to responding to customer inquiries, handling feedback,
                and managing promotional emails.
                Our service is designed to make
                this process as easy and efficient as possible. ' />
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1>Elevate Your Email Game</h1>
     
      </div>
      <div className="gpt3__whatgpt3-container">
      <Feature title='Efficient' text='The service is designed to help businesses manage their email responses and feedbacks efficiently.' />
      <Feature title='Expertise' text='The service specializes in email classification, which means that it can categorize and organize emails based on their type and priority. ' />
      <Feature title='Easy to use' text='The service is designed to be user-friendly and easy to use. It is intuitive and requires minimal training, which means that businesses can start using the service without any hassle.' />
      </div>
    </div>
      {/* <header>
      <div className="logo">
          <img src= {dalogo} />
        </div>
        <nav className="navigation">
          <NavLink to="/mainhome">Home</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/ContactUs">Contact</NavLink>
        </nav>
      </header> */}

      {/* <div className="about-section" id="about">
        <div className="container">
          <div className="content-section">
            <div className="about-title">
              <h3>About us</h3>
            </div>
            <div className="About-content">
              <p>
                Welcome to our email classification service! We specialize in
                helping businesses manage their email responses and feedbacks
                for their publicity or offers. We understand the importance of
                staying on top of your email communication, especially when it
                comes to responding to customer inquiries, handling feedback,
                and managing promotional emails.
                Our service is designed to make
                this process as easy and efficient as possible. 
              </p>
              <div className="read-more-button">
                <a href="/ReadMore">Read More</a>
              </div>

            </div>

          </div>
        </div>
        <div className="image-section">
              <img src={blueAbout} alt="" />
            </div>
      </div> */}
    </>
  );
};

export default About;
