import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../dropdown.css";
import "../home.css";
import "../Charts";
import "./sendcostume.css";

// import './script'
export function SendCostume() {
 
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);

  const handleShow = () => {
    setShow(true);
    setShow2(false);
  };

  const handleShow2 = () => {
    setShow(false);
    setShow2(true);
  };

  return (
    <div className="table-data">
      <div className="Emails-mang">
        <div className="head">
          <h3>Send email</h3>
        </div>
        <form className="costumefrom" action="">
          <div className="message-type">
      
            <input type="radio" id="type1" name="type" onClick={handleShow} />
            <label htmlFor="type1">Costume Message</label>

            <input type="radio" name="type" id="type2" onClick={handleShow2} />
            <label htmlFor="type2">Auto Message</label>
          </div>
          {show && (
            <div>
             
              <div id="input-feild">
                <i>
                  <FontAwesomeIcon icon={faUser} className="icon"/>
                </i>
                <input type="text" placeholder="To" name="to" />
              </div>
              <div id="input-feild">
                <i>
                  <FontAwesomeIcon icon={faShare} className="icon"/>
                </i>
                <input type="text" placeholder="Subject" name="subject" />
              </div>
              <div id="input-feild">
                <i>
                  <FontAwesomeIcon icon={faMessage} className="icon" />
                </i>
                <textarea
                  placeholder="Message"
                  name="message"
                  rows={10}
                ></textarea>
              </div>
              <input type="submit" value="Send" className="send-btn" />
            </div>
          )}
          {show2 && (
            <div>
              <div id="input-feild">
                <i>
                  <FontAwesomeIcon icon={faUser} className="icon"/>
                </i>
                <input type="text" placeholder="To" name="to" />
              </div>
              <input type="submit" value="Send" className="send-btn" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default SendCostume;
