import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Chart from "chart.js";
import "../dropdown.css";
import "../home.css";
import "../Charts";
import './costume.css';
import people from "../img/people.png";

import { useState, useEffect, useRef } from "react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
// import './script'
export function Costume() {
  const [profile, setProfile] = useState(false);
  const toggleProfile = () => {
    setProfile(!profile);
  };
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    const allSideMenu = document.querySelectorAll<HTMLAnchorElement>(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement as HTMLLIElement;

      item.addEventListener("click", () => {
        allSideMenu.forEach((i) => {
          i.parentElement?.classList.remove("active");
        });
        li.classList.add("active");
      });
    });
  };
  const handleNavBarClick = () => {
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    sidebar.classList.toggle("hide");
  };
  let menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });
  const status = 'costume';
  return (
    <div className="home">
      <SideBar status={status}/>

      <section id="content">
        <TopBar/>

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Mailing Service</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Costume Emails
                  </a>
                </li>
              </ul>
            </div>
            <a href="" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Download PDF</span>
            </a>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Configure Email</h3>
              </div>
              <form action="">
                <div id="input-feild">
                  <i>
                  <FontAwesomeIcon icon={faShare} className="icon" />
                  </i>
                  <input type="text" placeholder="Subject" name="subject" />
                </div>
                <div id="input-feild">
                  <i>
                  <FontAwesomeIcon icon={faMessage} className="icon" />
                  </i>
                  <textarea placeholder="Message" name="message" rows={15} ></textarea>
                </div>
                <input type="submit" value="Save" className="send-btn" />
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default Costume;
