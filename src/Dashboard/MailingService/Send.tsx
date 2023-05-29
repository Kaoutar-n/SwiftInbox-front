import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";


import "../dropdown.css";
import "../home.css";
import "../Charts";


import { useState, useEffect, useRef } from "react";
import SendCostume from "./SendCostume";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
// import './script'
export function Send() {
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
  
  const status = 'send';
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
                    Send Email
                  </a>
                </li>
              </ul>
            </div>
     
          </div>
           
         
           <SendCostume/>
        </main>
      </section>
    </div>
  );
}
export default Send;
