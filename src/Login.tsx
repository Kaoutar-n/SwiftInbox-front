import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import  API  from "./API";




export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = 'true';
  const notLogin = 'false';
  
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate();
  const ProceedLoginusingAPI = (e : any) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      fetch(`${API.Link}User`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Login failed, invalid credentials");
          }
        })
        .then((resp) => {
          console.log(resp);
          toast.success("You Logged in successfully");
          sessionStorage.setItem("username", username);
          localStorage.setItem("logged", "true");
          sessionStorage.setItem("jwttoken", resp.jwtToken);
          localStorage.setItem("userDetails", JSON.stringify(resp)); 
          navigate('/home');
         
          
        })
        .catch((err) => {
          toast.error("UserName or Password is incorrect");
          
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  
  return (
    
   
    <div className="bod">
  
      
      
      <div className="wrapper">
        <div className="form-box login">
   
          <h2>Login</h2>
          <form action="#" onSubmit={ProceedLoginusingAPI}>
            <div className="input-box">
              <span className="icon">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>{" "}
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Username/Email</label>

            </div>
            <div className="input-box">
              <span className="icon">
                <i>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} />
                </i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label> Password</label>
            </div>
            <div className="remeber-forgot">
             
              <a href="/forgotpassword">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="login-register">
              <p>
                Don't have an account?{" "}
                <a href="/Register" className="register-link">
                  Register
                </a>
              </p>
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
}