import React from "react";
import {  useNavigate } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import  API  from "./API";



export const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setfirstName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };



  function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^06\d{8}$/;
    if(phoneNumberRegex.test(phone)){
      setPhone(phone);
      return true;
    }else{
      return false;
    }
    
  }

  function validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  const ProceedRegisterusingAPI = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if(validatePassword(password) && validatePhoneNumber(phone) && validateEmail(email)){
      const data = {
        UserName: username,
        Password: password,
        ConfirmPassword: confirmPassword,
        LastName: lastName,
        FirstName: firstName,
        Phone: phone,
        Email: email,
      };
      const url = `${API.Link}User/create`;
      axios
         .post(url, data)
         .then((result) => {
          toast.success("You are Registred Successfully!");
          navigate("/");
         })
         .catch((err) => {
          alert(err.message);
          toast.error("Registration Failed!");
         });
    }else if(!validatePassword(password) && validatePhoneNumber(phone) && validateEmail(email)){
      toast.error("Please Enter A Valid Password ! (at least 8 characters)");
    }else if((validatePassword(password) && !validatePhoneNumber(phone) && validateEmail(email))){
      toast.error("Please Enter A Valid PhoneNumber !");
    }else{
      toast.error("Please Enter A Valid Email !");
    }
    
    
  };

  return (
    <div className="bod">
      <div id="registerBox" className="wrapper">
        <div className="form-box login">
          <h2>Register</h2>

          <form onSubmit={ProceedRegisterusingAPI}>
           
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>{" "}
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
              />
              <label> First Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>{" "}
              </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label> Last Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>{" "}
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label> User Name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faPhone} />
                </i>{" "}
              </span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label> Phone Number</label>
            </div>
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>{" "}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e)}
                className={!isEmailValid ? "invalid-input" : ""}
                required
              />
              <label> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} />
                </i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label> Password</label>
            </div>
            
            <div className="input-box">
              <span className="icon">
                <i>
                   <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} />
                </i>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label> Confirm Password</label>
            </div>
            
            
            <button type="submit" className="btn">
              Register
            </button>
            <div className="login-register">
              <p>
                Already have an account?{" "}
                <a href="/" className="register-link">
                  Login
                </a>
              </p>
     
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
