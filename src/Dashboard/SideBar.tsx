import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Link, NavLink } from "react-router-dom";
import "./home.css";

import { useState } from "react";
interface NavbarProps {
  status: string;
}
export function SideBar(props: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState(props.status);

 return (
    <>
      <section id="sidebar">
        <Link to="#" className="brand">
          <FontAwesomeIcon icon={faUser} className="ico" />
          <span className="text">Swift Admin</span>
        </Link>
        <ul className="side-menu top">
          <li className={activeMenu ==="dashboard" ? "actived" : ""}>
            <NavLink to="/home">
              <FontAwesomeIcon icon={faTableColumns} className="ico" />
              <span className="text"> Dashboard</span>
            </NavLink>
          </li>
         
          <li className={activeMenu === "contacts" ? "actived" : ""}>
            <NavLink to="/EmailsContent">
              <FontAwesomeIcon icon={faUsers} className="ico" />
              <span className="text"> Contacts</span>
            </NavLink>
          </li>
          <li className={activeMenu === "emails" ? "actived" : ""}>
            <NavLink to="/Emails">
              <FontAwesomeIcon icon={faMailBulk} className="ico" />
              <span className="text">Inbox</span>
            </NavLink>
          </li>
          <li className={activeMenu === "costume" ? "actived" : ""}>
            <NavLink
              to="/costume"
            >
              <FontAwesomeIcon icon={faEnvelope} className="ico" />
              <span className="text">Template</span>
            </NavLink>
          </li>
          <li className={activeMenu === "send" ? "actived" : ""}>
            <NavLink
              to="/send"
            >
              <FontAwesomeIcon icon={faEnvelope} className="ico" />
              <span className="text">Send Email</span>
            </NavLink>
          </li>
         
        </ul>
      </section>
    </>
  );
}
