import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

import "./home.css";
import JoditEditor from 'jodit-react';

import "./Charts";
import {
  Key,
  useEffect,
  useRef,
  useState,
} from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { toast } from "react-toastify";
import  API  from "../API";

export function Emails() {
  const editor = useRef(null);
  const [replyBody, setReplyBody] = useState("");
  const status = "emails";
  const [query, setQuery] = useState("");
  const storedData = localStorage.getItem("userDetails");
  const [data, setData] = useState<any>([]);
  const [viewEmail, setviewEmail] = useState(false);
  const [replyEmail, setReplyEmail] = useState(false);
  const [mailData, setMailData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataExist, setDataExist] = useState(false)

  const toggleviewEmail = () => {
    setviewEmail(!viewEmail);
  };

  const toggleReplyEmail = () => {
    setReplyEmail(!replyEmail);
    setviewEmail(!viewEmail);
  };
  const toggleviewEmailRemove = () => {
    if (viewEmail === true){
      setviewEmail(false);
    }
    if (replyEmail === true){
      setReplyEmail(false);
    }
    else{
      setReplyEmail(false);
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
 const GetData = () => {
  if (storedData) {
    const parseddata = JSON.parse(storedData);
    const id = parseddata.id;
    fetch(`${API.Link}email/receive`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(id),
    })
      .then((response) => response.json())

      .then((data) => {
        if(data !== undefined) {
          setIsLoading(false);
        }else{
          setDataExist(true);
        }
        setData(data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  } else {
    console.error("No ID found in local storage");
  }
 }
  useEffect(() => {
    GetData();
  }, []);

  function mailInfo(id: Key) {
    data.forEach((item: any) => {
      if (item.id === id) {
        toggleviewEmail();
        setMailData(item);
      }
    });
  }

  const handleReply = (email: Text, subject: Text) => {
    const data ={
      reciever: email,
      subject: subject,
      body: replyBody
    }
    fetch(`${API.Link}email/sendcustomEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("reply sent Successfuly!")
          toggleReplyEmail();
          setReplyBody("")
        } else {
          toast.error("Failed to send the reply !")

        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  

  return (
    <div className="home">
      <SideBar status={status} />
      <section id="content" >
        <TopBar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Inbox</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="/">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="/">
                    Inbox
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="table-data" >
            <div className="Emails-mang ">
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
              <div className="table-wrapper">
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
                {isLoading ? (
                    <tr>
                      <td colSpan={5}>Loading...</td>
                    </tr>
                  ) : dataExist ? (
                    <tr>
                      <td colSpan={5}>No data found</td>
                    </tr>
                  ) :
                  data.map(
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
              </div>
              {viewEmail && (
                <>
                    <div className="overlay"onClick={toggleviewEmailRemove}>
                    </div>
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
                    <Button style={{ color: "white", background: "#3c91e6", marginTop:"25px", fontSize:'16px'  }}  onClick={toggleReplyEmail}value="Reply" className="send-btn">
                      Reply
                    </Button>
                  </form>
                </div>
                </>
              )}
              {replyEmail && (
                <>
                    <div className="overlay"onClick={toggleviewEmailRemove}>
                    </div>
                <div className="emailV-container">
                  {/* <div className="overlay" onClick={toggleviewEmail}></div> */}
                  <div className="head">
                    <h3>Reply</h3>
                  </div>
                  <form action="">
                <div id="input-feild">
                 
                  <input type="text" value={mailData.senderemail} name="subject" />
                </div>
                <br />
        
                <div id="input-feild">
                 
                  <input type="text" value={mailData.subject} placeholder="Subject" name="subject" />
                </div>
                <div className="JoditEditor">
                 
                  <JoditEditor
                  
                  ref={editor}
                  value={replyBody}
                  onChange={(content: any) =>setReplyBody(content)}
              
                  />
               
                </div>
                <Button onClick={() => handleReply(mailData.senderemail,mailData.subject)} style={{ color: "white", background: "#3c91e6", marginTop:"25px", fontSize:'16px'  }}  className="send-btn">Send</Button>
              </form>
                </div>
                </>
              )}

            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Emails;
