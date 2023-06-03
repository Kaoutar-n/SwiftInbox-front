import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import  API  from "./API";



export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate()
  function validatePassword(password: string): boolean {
    return password.length >= 8;
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getToken = () => {
    const storedEmail = localStorage.getItem("email");
    const _emailToJ = {
      email: storedEmail
    }
    fetch(`${API.Link}User/Get-Password-Token`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_emailToJ),
    }).then((response) => response.json())

    .then((data) => {
      setToken(data)
    })
    .catch((error) => {
      toast.error("Please try again later!")
    });
  }

  const handleSubmit = () => {
    if ((newPassword === confirmNewPassword) && validatePassword(newPassword)){
      const data ={
        token: token,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword
        
      }
        fetch(`${API.Link}User/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.status === 200){
            getToken()
            toast.success("Password changed successfuly !")
            navigate("/")
          } else {
            toast.error("This user don't have account !")
          }
        })
        .catch((error) => {
          toast.error("Failed to send the email !")
        });
    }else if(!(newPassword === confirmNewPassword) && validatePassword(newPassword)){
      toast.error("Passwords do not match")
    }else{
      toast.error("Password has to be at least 8 characters !")
    }
  };
  return (
    <div className="bod">
      
   <div className="wrapper">
    <div className="form-box login">
      <h2>Reset Password</h2>
      <div >
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} /></i> </span>
        <input type="password" required value={newPassword}  onChange={(e) => setNewPassword(e.target.value)}/>
        <label> New Password</label>
      </div>
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={togglePasswordVisibility} /></i> </span>
        <input type="password" required value={confirmNewPassword}  onChange={(e) => setConfirmNewPassword(e.target.value)}/>
        <label> Confirm Password</label>
      </div>

      <Button onClick={() => handleSubmit()}  style={{ color: "white", background: "#3c91e6", marginTop:"25px" }}>Save</Button>
    
      </div>
    </div>
   </div>
  </div>
   
  );
};

export default ResetPassword;
