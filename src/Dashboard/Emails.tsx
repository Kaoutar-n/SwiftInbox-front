import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./home.css";

import "./Charts";
import { EmailsUsers } from "./EmailsUsers";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
// import './script'

export function Emails() {
  const [profile, setProfile] = useState(false);
  const toggleProfile = () => {
    setProfile(!profile);
  };
  const status = "emails";
  const [query, setQuery] = useState("");
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
                  <a href="/">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="/">
                    Emails
                  </a>
                </li>
              </ul>
            </div>
            <a href="/" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Import PDF</span>
            </a>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Recent Emails</h3>

                <div className="form-input">
                  <input
                    type="search"
                    placeholder="Search.."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                    <FontAwesomeIcon icon={faSearch} className="ico" />
                  </button>
                </div>
                <i className="ico">
                  <FontAwesomeIcon icon={faFilter} />
                </i>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Classification</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {EmailsUsers.filter((user) =>
                    user.first_name.toLowerCase().includes(query)
                  ).map((user) => (
                    <tr key={user.id}>
                      <td>
                        <p> {user.first_name} </p>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.subject}</td>
                      <td>{user.classification}</td>
                      <td>
                        <a onClick={toggleProfile}>
                          <span className="status completed">View</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  {profile && (
                    <div className=" emailV-container">
                      <div className="overlay" onClick={toggleProfile}>
                        {" "}
                      </div>
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
                            <FontAwesomeIcon
                              icon={faMessage}
                              className="icon"
                            />
                          </i>

                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </div>
                        <button
                          type="submit"
                          value="Reply"
                          className="send-btn"
                        >
                          Reply
                        </button>
                      </form>
                    </div>
                  )}
                  {/* <tr>
                    <td> <p>Jhon Doe</p></td>
                    <td>user@gmail.com</td>
                    <td>Blah blah blah</td>
                    <td> <a href="/ViewEmail"><span className="status completed">View</span></a></td>
                  </tr>
                  <tr>
                    <td> <p>Jhon Doe</p></td>
                    <td>user@gmail.com</td>
                    <td>Blah blah blah</td>
                    <td> <a href="/ViewEmail"><span className="status completed">View</span></a></td>
                  </tr>
                  <tr>
                    <td> <p>Jhon Doe</p></td>
                    <td>user@gmail.com</td>
                    <td>Blah blah blah</td>
                    <td> <a href="/ViewEmail"><span className="status completed">View</span></a></td>
                  </tr>
                  <tr>
                    <td> <p>Jhon Doe</p></td>
                    <td>user@gmail.com</td>
                    <td>Blah blah blah</td>
                    <td> <a href="/ViewEmail"><span className="status completed">View</span></a></td>
                  </tr>
                  <tr>
                    <td> <p>Jhon Doe</p></td>
                    <td>user@gmail.com</td>
                    <td>Blah blah blah</td>
                    <td> <a href="/ViewEmail"><span className="status completed">View</span></a></td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default Emails;
