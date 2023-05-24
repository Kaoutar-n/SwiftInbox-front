import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import './MailingService/costume.css'
import "./Charts";

import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
// import './script'
export function ViewEmail() {
  const status = "viewEmail";

  const handleNavBarClick = () => {
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    sidebar.classList.toggle("hide");
  };
  return (
    <div className="home">
      <SideBar status={status} />
      <section id="content">
        <TopBar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Emails</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    View Email
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Download PDF</span>
            </a>
          </div>
          <div className="table-data">
            <div className="Emails-mang costumefrom">
              <div className="head">
                <h3>Email Received</h3>
              </div>
              <form action="">
                <div id="input-feild">
                  <i>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                  </i>
                  <p>From: kkk</p>
                </div>
                <div id="input-feild">
                  <i>
                    <FontAwesomeIcon icon={faShare} className="icon" />
                  </i>
                  <p>Subject: hhhh</p>
                </div>
                <div id="input-feild">
                  <i>
                    <FontAwesomeIcon icon={faMessage} className="icon" />
                  </i>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <button type="submit" value="Reply" className="send-btn">
                  Reply
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default ViewEmail;
