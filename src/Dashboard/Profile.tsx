import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./home.css";
import "./profileSettings.css";
import people from "./img/people.png";
import { useEffect, useState } from "react";
import EditableField from "./EditableFeild";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

import React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
// import './script'
interface Field {
  name: string;
  value: string;
}
export function Profile() {
  const [fields, setFields] = useState<any>([]);
  const [data, setdata] = useState<any>([]);

  const [username, setUsername] = React.useState("");

  const [selectedImage, setSelectedImage] = useState(people);
  const [userPassword, setuserPassword] = useState("");
  const [userNewPassword, setuserNewPassword] = useState("");
  const [userConfirmPassword, setuserConfirmPassword] = useState("");
  const [showProfile, setShowProfile] = useState(true);

  const GetData = () => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const id = parsedData.id;

        fetch(`http://localhost:53264/api/User/GetProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            setdata(data);
            const mappedFields = [
              { name: "First Name", value: data.firstName },
              { name: "Last Name", value: data.lastName },
              { name: "Company Name", value: data.companyName },
              { name: "Email", value: data.email },
              { name: "Phone", value: data.phone },
            ];
            setFields(mappedFields);
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      } catch (error) {
        console.error("Error parsing storedData JSON: ", error);
      }
    } else {
      console.error("No ID found in local storage");
    }
  };
  useEffect(() => {
    GetData();
  }, []);

  const changePassword = () => {
    
      const storedData = localStorage.getItem("userDetails");
    if (storedData) {
    if (userNewPassword === userConfirmPassword){
      try {
        const parsedData = JSON.parse(storedData);
        const username = parsedData.login;

        const data = {
          username: username,
          password: userPassword,
          newPassword: userNewPassword,
          confirmNewPassword: userConfirmPassword,
        }

        fetch(`http://localhost:53264/api/User/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => 
          {
            if(response.status === 200){
              toast.success("Password Changed Successfuly!")
              setuserPassword("")
              setuserNewPassword("")
              setuserConfirmPassword("")
            }
            
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      } catch (error) {
        console.error("Error parsing storedData JSON: ", error);
      }
    } else{
      toast.error("Passwords are not matching")
    }
    }else {
      console.error("No ID found in local storage");
    }
  }

 

  //console.log(fields);

  function handleSave(
    newValues: { name: string; value: string }[],
    image: string
  ) {
    setFields(newValues);
    setSelectedImage(image);
    setShowProfile(true);
  }

  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const link1 = document.getElementById("link1");
  const link2 = document.getElementById("link2");

  const handleShow = () => {
    setShow(true);
    setShow2(false);

    link2?.classList.remove("active");
    link1?.classList.add("active");
  };

  const handleShow2 = () => {
    setShow2(true);
    setShow(false);

    link1?.classList.remove("active");
    link2?.classList.add("active");
  };

  const status = "";
  return (
    <div className="home">
      <SideBar status={status} />
      <section id="content">
        <TopBar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Profile</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Profile settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-side-main">
            <div className="table-data profile-sidbar">
              <div className="profile-mang ">
                <div className="head">
                  <h3>
                    {data.firstName} {data.lastName}
                  </h3>
                </div>

                <div className="profile-sidebar-container">
                  <div className="profile-sidebar-item">
                    <a
                      href="#"
                      onClick={handleShow}
                      id="link1"
                      className="active"
                    >
                      <span>
                        <FontAwesomeIcon icon={faUser} className="ico" />
                      </span>
                      <span>Personal Account</span>
                    </a>
                  </div>
                  <div className="profile-sidebar-item">
                    <a href="#" id="link2" onClick={handleShow2}>
                      <span>
                        <FontAwesomeIcon icon={faLock} className="ico" />
                      </span>
                      <span>Change Password</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-data profile-inputs">
              {show && fields.length > 0 && (
                <div className="Emails-mang">
                  <div className="head">
                    <h3>Personal Account</h3>
                  </div>
                  <EditableField fields={fields} onSave={handleSave} />
                </div>
              )}
              {show2 && (
                <div className="Emails-mang ">
                  <div className="head">
                    <h3>Change Password</h3>
                  </div>
                  <form className="profile-key" >
                    <div className="Labels">
                      <label> Current Password </label>
                      <input
                        type="password"
                        required
                        value={userPassword}
                        onChange={(e) => setuserPassword(e.target.value)}
                      />
                      <label> New Password </label>
                      <input
                        type="password"
                        required
                        value={userNewPassword}
                        onChange={(e) => setuserNewPassword(e.target.value)}
                      />
                      <label> Confirm Password </label>
                      <input
                        type="password"
                        required
                        value={userConfirmPassword}
                        onChange={(e) => setuserConfirmPassword(e.target.value)}
                      />
                      <Button onClick={changePassword}  >Save</Button>
                    </div>
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
