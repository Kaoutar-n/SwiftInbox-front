
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useState } from "react";
import API from "./API";

export const ContactUs = () => {

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  const handleReply = () => {
    const data = {
      reciever: 'rbellati.reda16@gmail.com',
      subject: 'Contacted by client : '+{name},
      body:'Email :'+{email}+'\n'+{message},
    };
    fetch(`${API.Link}api/email/sendcustomEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Thanks for contacting us ! you will receive an reply on your email");
          ;
        } else {
          toast.error("Failed to send the reply!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="bod">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Contact Us</h2>
          <form >
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                <FontAwesomeIcon icon={faUser} />
                </i>{" "}
              </span>
              <input onChange={(e) => setName(e.target.value)} type="text" required />
              <label> Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
               
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>
              </span>
              <input onChange={(e) => setEmail(e.target.value)} type="text" required />
              <label> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i>
                <FontAwesomeIcon icon={faMessage} />
                </i>
              </span>
              <input  onChange={(e) => setMessage(e.target.value)} type="text" className="message" required/>
              <label> Message</label>
            </div>
            <button onClick={handleReply} type="submit" className="btn">
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
