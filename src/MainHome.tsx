import "./Login.css";
import people1 from "./Dashboard/img/people1.png";
import ai from "./img/ai.png";
import About from "./About";
import Services from "./Services";
import NavBar from "./NavBar";
import "./Navbar.css";
import Footer from "./Footer";
import Second from "./img/Second.png";
import MainhomeImg from "./img/MainhomeImg.png";

export function MainHome() {
  return (
    <div className="App">
      <header>
        <NavBar />
        <nav className="navigation"></nav>
      </header>
      <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1>
            Effortlessly Manage Your Email Inbox with SwiftInbox
          </h1>
          <p>
            Our email classification service organizes the responses and
            feedbacks you receive for offer and publicity emails you send. Our
            algorithm sorts your inbox into relevant categories, making it
            easier to identify important messages. Try our hassle-free service
            today!
          </p>
          <div className="gpt3__header-content__input">
          <input type="email" placeholder="Your Email Adress" />
          <button type="button"> Get Started!</button>
        </div>
          <div className="gpt3__header-content__people">
            <img src={people1} alt="people" />
            <p>1,600 people requested access a visit in last 24 hours</p>
          </div>
          <div className="gpt3__navbar"></div>
        </div>

        {/* <div className="gpt3__header-image">
          <img src={MainhomeImg} alt="ai" />
        </div> */}
      </div>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="footer">
        {" "}
        <Footer />{" "}
      </section>
    </div>
  );
}




