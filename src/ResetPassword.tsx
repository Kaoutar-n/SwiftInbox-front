import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Button } from "@mui/material";



export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedtoken = urlParams.get('token');
    setToken(extractedtoken || '');
    console.log(token);
  }, [token]);

  const handleSubmit = () => {
    if (password === newPassword){
      const data ={
        newPassword: password,
        confirmNewPassword: newPassword,
        token: token
      }
        fetch("http://localhost:53264/api/User/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.status === 200) {
            navigate("/")
          } else {
            toast.error("This user don't have account !")
          }
        })
        .catch((error) => {
          toast.error("Failed to send the email !")
        });
    }else{
      toast.error("Passwords do not match")
    }
  };
  return (
    <div className="bod">
      
   <div className="wrapper">
    <div className="form-box login">
      <h2>Reset Password</h2>
      <div >
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={faEnvelope} /></i> </span>
        <input type="password" required value={password}  onChange={(e) => setPassword(e.target.value)}/>
        <label> New Password</label>
      </div>
      <div className="input-box">
        <span className="icon"> <i><FontAwesomeIcon icon={faEnvelope} /></i> </span>
        <input type="password" required value={newPassword}  onChange={(e) => setNewPassword(e.target.value)}/>
        <label> Confirm Password</label>
      </div>

      <Button onClick={() => handleSubmit()}>Save</Button>
    
      </div>
    </div>
   </div>
  </div>
   
  );
};

export default ResetPassword;
