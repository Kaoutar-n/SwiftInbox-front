import React from "react";
import "./Login.css"; 

import { NavLink } from "react-router-dom";

interface Props {
    onFormSwitch: (formName: string) => void;
  }

export const PageNotFound = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  
  return (
    <div className="bod">
      
   <header> 
    <h2 className="logo">Logo</h2>
    <nav className="navigation">
          <NavLink to="/">Login</NavLink>
          <NavLink to="/About">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/ContactUs">Contact</NavLink>
        </nav>
   </header>
    <h2>Page Not Found</h2>
  </div>
  
  );
};

export default PageNotFound;


