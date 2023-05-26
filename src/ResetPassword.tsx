import React from "react";
import { useState, FormEvent } from "react";

import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import dalogo from './img/dalogo.png'


export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="bod">
      
   <div className="wrapper">
    <div className="form-box login">
      <h2>Reset Password</h2>
      <form action="#" onSubmit={handleSubmet} >
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={faEnvelope} /></i> </span>
        <input type="password" required value={email}  onChange={(e) => setEmail(e.target.value)}/>
        <label> New Password</label>
      </div>
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={faEnvelope} /></i> </span>
        <input type="password" required value={email}  onChange={(e) => setEmail(e.target.value)}/>
        <label> Confirm Password</label>
      </div>

      <button type="submit" className="btn">Save</button>
    
      </form>
    </div>
   </div>
  </div>
   
  );
};

export default ResetPassword;
