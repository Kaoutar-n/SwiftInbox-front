import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../dropdown.css";
import "../home.css";
import "../Charts";
import './costume.css';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

export function Costume() {
  const editor = useRef(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const status = 'costume';
  const storedData = localStorage.getItem("userDetails");
  const [data, setData] = useState<any>([]);

  const GetData = () =>{
    if (storedData) {
      const parseddata = JSON.parse(storedData);
      const id = parseddata.id;
      fetch("http://localhost:53264/GetTemplate", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(id),
      })
        .then((response) => response.json())
    
        .then((data) => {
          console.log(data.subject);
          setData(data);

                   
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      console.error("No ID found in local storage");
    }
  } 

  useEffect(()=>{
    GetData();
  },[])


  const saveCostumEmail = (e: { preventDefault: () => void }) => {
    const data_mail = {
      "subject": subject,
      "body": body
      }
    if (storedData) {

        const parsedData = JSON.parse(storedData);
        const id = parsedData.id;
        const url = `http://localhost:53264/UpdateTemplate/${id}`;
        fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data_mail),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(body);
          console.log(data);
          toast.success("Template Saved Successfuly!")
                   
        })
        
}
}


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
           
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Configure Email</h3>
              </div>
              <form action="">
                <div id="input-feild">
                 
                  <input type="text"  defaultValue={data.subject} placeholder="Subject" onChange={(e) => setSubject(e.target.value)} name="subject" />
                </div>
                <div className="JoditEditor">
                 
                  <JoditEditor
                  
                  ref={editor}
                  value={data.body}
                  onChange={(content: any) =>setBody(content)}
              
                  />
               
                  {/* <textarea placeholder="Message" name="message" rows={15} ></textarea> */}
                </div>
                <Button style={{ color: "white", background: "#3c91e6", marginTop:"25px", fontSize:'16px'  }}  onClick={saveCostumEmail} className="send-btn">Save</Button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default Costume;
