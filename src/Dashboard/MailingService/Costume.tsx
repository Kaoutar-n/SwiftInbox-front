import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../dropdown.css";
import "../home.css";
import "../Charts";
import "./costume.css";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
// import './script'
export function Costume() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const status = "costume";
  return (
    <div className="home">
      <SideBar status={status} />

      <section id="content">
        <TopBar />

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
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                  />
                  {/* <textarea placeholder="Message" name="message" rows={15} ></textarea> */}
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
