import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import dalogo from './img/dalogo.png'
import NavBar from "./NavBar";
import { MainHome } from "./MainHome";
import ProtectedRoutes from "./ProtectedRoutes";




export function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = 'true';
  const notLogin = 'false';
  
  const navigate = useNavigate();
  const ProceedLoginusingAPI = (e : any) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      fetch("http://localhost:53264/api/User", {
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
              <label> UserName</label>
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