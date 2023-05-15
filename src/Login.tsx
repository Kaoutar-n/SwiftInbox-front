import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import dalogo from './img/dalogo.png'
import NavBar from "./NavBar";

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
};


export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const ProceedLoginusingAPI = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      fetch("https://localhost:7248/api/JWTToken", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            navigate("/Home");
          }
  
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
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
              <label> Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i>
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label> Password</label>
            </div>
            <div className="remeber-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
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
