import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faSearch,
  faBell,
  faRightFromBracket,

} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./home.css";
import people from "./img/people.png";
import { useState } from "react";

// import './script'
export function TopBar() {
  const [profile, setProfile] = useState(false);
  const toggleProfile = () => {
    setProfile(!profile);
  };

  const handleNavBarClick = () => {
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    sidebar.classList.toggle("hide");
  };
  return (
        <nav>
          <FontAwesomeIcon
            icon={faBars}
            className="ico"
            onClick={handleNavBarClick}
          />
          <form action="">
            <div className="form-input">
              <input type="search" placeholder="Search.." />
              <button type="submit" className="search-btn">
                <FontAwesomeIcon icon={faSearch} className="ico" />
              </button>
            </div>
          </form>
          <a href="#" className="notification">
            <FontAwesomeIcon icon={faBell} className="ico" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img onClick={toggleProfile} src={people} />
          </a>
          {profile && (
            <div className="profileSettings">
              <div className="overlay" onClick={toggleProfile}>
                {" "}
              </div>
              <div className="modal-content">
                <Link to="/profile">
                  <div className="profile-item">
                    <i>
                      <FontAwesomeIcon icon={faUser} />
                    </i>{" "}
                    Profile
                  </div>
                </Link>{" "}
               
                
                  <Link to="/profile">
                  <div className="profile-item">
                    <i>
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </i>{" "}
                    Logout
                    </div>
                  </Link>{" "}
               
                
     
              </div>
            </div>
          )}
        </nav>
  );
}
