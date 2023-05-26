import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { type } from "os";

interface Props {
  onFormSwitch: (formName: string) => void;
}

export const Forgot = ({ onFormSwitch }: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState("");
  const originalUrl = "http://localhost:3000/ResetPassword"
  var url = new URL(originalUrl)
  
  

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if(isValid){
      return true;
    }else{
      return false;
    }
  };
  const handle_send_email = () => {
    const data ={
      reciever: email,
      subject: subject,
      body: body,
    }
    fetch("http://localhost:53264/api/email/sendcustomEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Email sent Successfuly!")
        } else {
          toast.error("Failed to send the email !")
          console.error("Failed to send the email !");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    console.log('tokentokentoken',token)
  },[token])

  const GetToken = () => {
    const data ={
      email: email,
    }
    fetch("http://localhost:53264/api/User/Get-Password-Token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      setToken(data)      

    })
    .catch((error) => {
      toast.error("Try again Later")
    });
  }
    const handleSubmit = () => {
    if(!validateEmail(email)){
      alert("invalid email");
    }
    const _email_token ={
      email: email,
    }
      fetch("http://localhost:53264/api/User/Get-Password-Token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_email_token),
      }).then((response) => {
        if (response.status === 200) {
          GetToken();
          handle_send_email();
        } else {
          toast.error("This user don't have account !")
        }
      })
      .catch((error) => {
        toast.error("Failed to send the email !")
      });

  };

  useEffect(() => {
    url.searchParams.set("token", token)
    let modifiedUrl = url.href
    setSubject("Reset Your Password - Swift Inbox");
    setBody("Dear, \nWe received a request to reset your password for your Swift Inbox account. \nTo proceed with the password reset, please click on the link below:  \n<a href='"+ modifiedUrl +"'>Reset Password</a>\nIf you did not request a password reset, please ignore this email. Your password will not be changed. Thank you, The Swift Inbox Team")

  }, [token]);




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
