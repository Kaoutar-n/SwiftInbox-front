import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faSearch,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import people from "./img/people.png";
import { useState } from "react";

// import './script'
export function TopBar() {
  const [profile, setProfile] = useState(false);
  const toggleProfile = () => {
    setProfile(!profile);
  };
  const navigate = useNavigate();
  const handleNavBarClick = () => {
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    sidebar.classList.toggle("hide");
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
         
        </div>
      </form>
      <a href="#" className="notification">
        <FontAwesomeIcon icon={faBell} className="ico" />
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img onClick={toggleProfile} src={people} alt="profile-img" />
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
            <button onClick={handleLogout}>
              <div className="profile-item">
                <i>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </i>{" "}
                Logout
              </div>
            </button>{" "}
          </div>
        </div>
      )}
    </nav>
  );
}
