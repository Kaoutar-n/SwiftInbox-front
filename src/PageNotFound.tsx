import React from "react";
import "./Login.css"; 

interface Props {
    onFormSwitch: (formName: string) => void;
  }

export const PageNotFound = () => {
  return (
    <div className="bod">

    <h2>Page Not Found</h2>
  </div>
  
  );
};

export default PageNotFound;


