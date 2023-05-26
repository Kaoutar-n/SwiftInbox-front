import React from "react";
import { useState } from "react";

import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface Props {
  onFormSwitch: (formName: string) => void;
}

export const Forgot = ({ onFormSwitch }: Props) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  setSubject("Reset Your Password - Swift Inbox");
  setBody("Dear, \nWe received a request to reset your password for your Swift Inbox account. \nTo proceed with the password reset, please click on the link below:  \n<a href='http://localhost:3000/token='"+  +">Reset Password</a>\nIf you did not request a password reset, please ignore this email. Your password will not be changed. Thank you, The Swift Inbox Team")
  let data ={
    email: email,
    subject: subject,
    body: body,
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    fetch("http://localhost:53264/api/email/sendcustomEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User deleted.");
          toast.success("User Deleted Succesfuly!")
        } else {
          toast.error("Failed to delete user !")
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        // Handle error case
        console.error("Error:", error);
      });
  };



  return (
    <div className="bod">
      
   <div className="wrapper">
    <div className="form-box login">
      <h2>Forgot Password</h2>
      <form action="#" onSubmit={handleSubmit} >
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={faEnvelope} /></i> </span>
        <input type="text" required value={email}  onChange={(e) => setEmail(e.target.value)}/>
        <label> Email</label>
      </div>

      <button type="submit" className="btn">Send</button>
      <div className="login-register">
        <p><a href="/" className="register-link">Back to Login</a></p>
      </div>
      </form>
    </div>
   </div>
  </div>
   
  );
};

export default Forgot;
