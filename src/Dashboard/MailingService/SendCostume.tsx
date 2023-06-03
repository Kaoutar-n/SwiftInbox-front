import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import "../dropdown.css";
import "../home.css";
import "../Charts";
import "./sendcostume.css";
import JoditEditor from "jodit-react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import  API  from "../../API";


// import './script'
export function SendCostume() {
  const editor = useRef(null);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const storedData = localStorage.getItem("userDetails");

  const handleShow = () => {
    setShow(true);
    setShow2(false);
  };

  const handleShow2 = () => {
    setShow(false);
    setShow2(true);
  };

  const sendEmail = ( emailtype : number ) => {

    if (storedData) {
        const parsedData = JSON.parse(storedData);
        const id = parsedData.id;
        if (emailtype === 0){
          const data ={
            "userID" : id,
            "emailtype" : emailtype,
            "subject" : "",
            "body" : "",
          }
            const url = `${API.Link}email/send`;
          fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);      
            toast.success("Email Sent Successfully")
          })
            
      }else{
            const data ={
              "userID" : id,
              "emailtype" : emailtype,
              "subject" : subject,
              "body" : body,
          }
          const url = `${API.Link}email/send`;
          fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);      
            toast.success("Email Sent Successfully")
          })
       }
       
        
}}



  return (
    <div className="table-data">
      <div className="Emails-mang">
        <div className="head">
          <h3>Send email</h3>
        </div>
        <form className="costumefrom" action="">
          <div className="message-type">
           <h2>New Message</h2>
            {/* <input type="radio" id="type1" name="type" onClick={handleShow} />
            <label htmlFor="type1">Costume Message</label>

            <input type="radio" name="type" id="type2" onClick={handleShow2} />
            <label htmlFor="type2">Auto Message</label> */}
          </div>
          {show && (
            <div>
             
              <div id="input-feild">
                
              </div>
              <div id="input-feild">
               
                <input type="text" onChange={(e) => setSubject(e.target.value)} placeholder="Subject" name="subject" />
              </div>
              <div id="input-feild">
              <div className="JoditEditor">
                <JoditEditor
                  ref={editor}
                  value = ''
                  onChange={(content: any) =>setBody(content)}
                
                  />
        
              </div>
              </div>
              <Button  style={{ color: "white", background: "#3c91e6", marginTop:"25px", marginBottom:'25px', fontSize:'16px'  }}
                  
                  className="send-btn"  onClick={()=>sendEmail(1)} >Send</Button>
            </div>
          )}
        
            <div>
            <h2>Auto Message</h2>
              <div id="input-feild">
                
              </div>
              <Button  style={{ color: "white", background: "#3c91e6", marginTop:"25px", marginBottom:'25px' , fontSize:'16px'  }}  onClick={()=>sendEmail(0)}  className="send-btn"   >Send</Button>
            </div>
        
        </form>
      </div>
    </div>
  );
}

export default SendCostume;






