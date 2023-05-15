import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
                        <a href="/ViewEmail">
                          <span className="status completed">View</span>
                        </a>
                      </td>
                    </tr>
                  ))}
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
