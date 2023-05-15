import React from "react";
import { useState, FormEvent } from "react";

import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import dalogo from './img/dalogo.png'

interface Props {
  onFormSwitch: (formName: string) => void;
}

export const Forgot = ({ onFormSwitch }: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="bod">
      
   <div className="wrapper">
    <div className="form-box login">
      <h2>Forgot Password</h2>
      <form action="#" onSubmit={handleSubmet} >
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
