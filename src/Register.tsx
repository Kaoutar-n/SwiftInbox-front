import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

interface Props {
  onFormSwitch: (formName: string) => void;
}

export const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setfirstName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const ProceedRegisterusingAPI = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      UserName: username,
      Password: password,
      ConfirmPassword: confirmPassword,
      LastName: lastName,
      FirstName: firstName,
      Phone: phone,
      Email: email,
    };
    // const url = "http://localhost:53264/api/User/create";
    // axios
    //   .post(url, data)
    //   .then((result) => {
    //     alert(result.data);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label> Password</label>
            </div>
            
            <div className="input-box">
              <span className="icon">
                <i>
                  <FontAwesomeIcon icon={faLock} />
                </i>
              </span>
              <input
                type="password"
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
