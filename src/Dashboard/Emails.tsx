import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./home.css";

import "./Charts";
import {
  Key,
  useEffect,
  useState,
} from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

export function Emails() {
  const status = "emails";
  const [query, setQuery] = useState("");
  const storedData = localStorage.getItem("userDetails");
  const [data, setData] = useState<any>([]);
  const [viewEmail, setviewEmail] = useState(false);
  const [mailData, setMailData] = useState<any>([]);

  const toggleviewEmail = () => {
    setviewEmail(!viewEmail);
  };

  const toggleviewEmailRemove = () => {
    if (viewEmail === true){
      setviewEmail(false);
    }
    
  };
  
  function Classifier(cat: number) {
    if (cat === 0) {
      return "Negative";
    } else if (cat === 1) {
      return "Positive";
    } else {
      return "Neutral";
    }
  }

  useEffect(() => {
    if (storedData) {
      const parseddata = JSON.parse(storedData);
      const id = parseddata.id;
      fetch("http://localhost:53264/api/email/receive", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(id),
      })
        .then((response) => response.json())

        .then((data) => {
          console.log(typeof data);
          setData(data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      console.error("No ID found in local storage");
    }
  }, []);

  function mailInfo(id: Key) {
    data.forEach((item: any) => {
      if (item.id === id) {
        toggleviewEmail();
        setMailData(item);
      }
    });
  }
  

  return (
    <div className="home">
      <SideBar status={status} />
      <section id="content" onClick={toggleviewEmailRemove}>
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
                  {data.map(
                    (mail: {
                      id: Key;
                      sendername: string;
                      senderemail: string;
                      subject: string;
                      category: number;
                    }) => (
                      <tr key={mail.id} onClick={() => mailInfo(mail.id)}>
                        <td>
                          <p>{mail.sendername}</p>
                        </td>
                        <td>{mail.senderemail}</td>
                        <td>{mail.subject}</td>
                        <td>{Classifier(mail.category)}</td>
                        <td>
                          <a onClick={toggleviewEmail}>
                            <span className="status completed">View</span>
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              {viewEmail && (
                <div className="emailV-container">
                  {/* <div className="overlay" onClick={toggleviewEmail}></div> */}
                  <div className="head">
                    <h3>Email Received</h3>
                  </div>
                  <form action="">
                    <div id="input-feild">
                      <i>
                        <FontAwesomeIcon icon={faUser} className="icon" />
                      </i>
                      <p>From: {mailData.senderemail}</p>
                    </div>
                    <div id="input-feild">
                      <i>
                        <FontAwesomeIcon icon={faShare} className="icon" />
                      </i>
                      <p>Subject: {mailData.subject}</p>
                    </div>
                    <div id="input-feild">
                      <i>
                        <FontAwesomeIcon icon={faMessage} className="icon" />
                      </i>
                      <p>{mailData.body}</p>
                    </div>
                    <button type="submit" value="Reply" className="send-btn">
                      Reply
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Emails;
