import React, { useState } from "react";
import "./profileSettings.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
interface Props {
  fields: { name: string; value: string }[];
  onSave: (values: { name: string; value: string }[], image: string) => void;
}

function EditableField({ fields, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] =
    useState<{ name: string; value: string }[]>(fields);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleSave() {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave(values, reader.result as string);
        setEditing(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      onSave(values, "");
      setEditing(false);
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
                <label>{field.name}</label> <br />
                <div className="input">
                  <input type="text" defaultValue={field.value} disabled />
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
          <div className="Labels">
            <label>{field.name}: </label>
            <input
              type="text"
              defaultValue={field.value}
              
            />
          </div>
        </div>
      ))}
      <div className="image-input">
        <input
          type="file"
          id="file"
          onChange={handleFileSelect}
          accept="image/*"
        />
        <label htmlFor="file">
          {" "}
          <FontAwesomeIcon icon={faImage} className="faimage" /> Choose Image{" "}
        </label>
      </div>
      <button className="profile-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default EditableField;


