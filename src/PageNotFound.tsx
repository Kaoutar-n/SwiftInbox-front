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

    <h2>Page Not Found</h2>
  </div>
  
  );
};

export default PageNotFound;


