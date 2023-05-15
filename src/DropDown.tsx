import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import "./dropdown.css";
function DropDown() {
    const[isActive, setIsActive]= useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
         <span className="text"><FontAwesomeIcon icon={faEnvelope} className="ico" />Mailing </span><FontAwesomeIcon icon={faCaretDown} />
      </div>
        {isActive && (
                  <div className="dropdown-content">
                  <div className="dropdown-item">Costume</div>
                  <div className="dropdown-item">Send</div>
                </div>
        )}
    </div>
  );
}
export default DropDown;
