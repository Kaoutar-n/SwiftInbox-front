import React, { useState } from "react";
import "./profileSettings.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import  API  from "../API";
interface Props {
  fields: { name: string; value: string }[];
  onSave: (values: { name: string; value: string }[], image: string) => void;
}

function EditableField({ fields, onSave }: Props) {

  const [editing, setEditing] = useState(false);
  const [values, setValues] =
    useState<{ name: string; value: string }[]>(fields);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const storedData = localStorage.getItem("userDetails")!;
  
  const parsedData = JSON.parse(storedData);
  const id = parsedData.id;

  function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^06\d{8}$/;
    if(phoneNumberRegex.test(phoneNumber)){

      return true;
    }else{
      return false;
    }
    
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
  };

  const postData = async () => {
    const data = {
      firstName: values.find((field) => field.name === "First Name")?.value || "",
      lastName: values.find((field) => field.name === "Last Name")?.value || "",
      email: values.find((field) => field.name === "Email")?.value || "",
      phone: values.find((field) => field.name === "Phone")?.value || "",
    };
    if(validatePhoneNumber(data.phone) && validateEmail(data.email)){
      try {
        const response = await fetch(`${API.Link}User/UpdateProfile?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          console.log("Data posted successfully");
          toast.success("Profile Updated Successfully !")
        } else {
          console.error("Failed to post data");
        }
      } catch (error) {
        console.error("An error occurred while posting data:", error);
        toast.error("Please try again later !");
      }
    }else if(validatePhoneNumber(data.phone) && !validateEmail(data.email)){
      toast.error("Invalid Email !")
    }else{
      toast.error("Invalid Phone Number !")
    }
  
    
  };
  function handleSave() {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave(values, reader.result as string);

        setEditing(false);
        postData();
      };
      reader.readAsDataURL(selectedFile);
    } else {
      onSave(values, "");
      setEditing(false);
      postData();
    }
  }

  


  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  }

  if (!editing) {
    return (
      <div className="profile-container-feilds">
        {values.map((field, index) => (
          <div className="profile-key" key={index}>
            <div className="profile-feilds" onClick={() => setEditing(true)}>
              <div className="Labels">
                <label>{field.name}</label> <br />{" "}
                <div className="input">
                  <input type="text" value={field.value} disabled />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className="profile-btn" onClick={() => setEditing(true)}>
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {values.map((field, index) => (
        <div className="profile-key" key={index}>
          <div className="profile-feilds">
          <div className="Labels">
            <label>{field.name}: </label>
            <input
              type="text"
              value={field.value}
              onChange={(event) => {
                const newValues = [...values];
                newValues[index].value = event.target.value;
                setValues(newValues);
              }}
            />
          </div>
          </div>
        </div>
      ))}
      {/* <div className="image-input">
        <input
          type="file"
          id="file"
          onChange={handleFileSelect}
          accept="image/*"
        />
        <label htmlFor="file">
        
          <FontAwesomeIcon icon={faImage} className="faimage" /> Choose Image{" "}
        </label>
      </div> */}
      <button className="profile-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default EditableField;


