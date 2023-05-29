import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./Navbar.css";
import Dalogo from './Dashboard/img/swiftLogo.png'


const Menu = () => (
  <>
    <p>
      <a href="/mainhome">Home</a>
    </p>
    <p>
      <a href="#about">About</a>
    </p>
    <p>
      <a href="#services">Services</a>
    </p>
 
  </>
);
const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="gpt3__navbar">
     
     
      <div className="gpt3__navbar-links">
      <div className="logo-image">
      <img src={Dalogo} />
      </div>
      
        <div className="gpt3__navbar-links_container">
          
          <Menu />
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <a href="/contactus"><p>Contact Us</p></a>
        <a href="/"><p>sign in</p></a>
        
        <button type="button"> <a href="/Register">Sign up</a> </button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3_navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />
              <div className="gpt3__navbar-menu_container-links-sign">
                <p>sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
