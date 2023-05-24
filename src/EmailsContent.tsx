import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import "./home.css";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Users } from "./users.js";
import { FormEvent } from "react";
import { Console } from "console";
import axios from "axios";
import { Button } from "@mui/material";
// import './script'

export function EmailsContent() {
  const status = "contacts";
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [uphone, usetPhone] = useState("");
  const [uname, usetName] = useState("");
  const [uemail, usetEmail] = useState("");
  const [uindustry, usetIndustry] = useState("");
  const [edit, setEdit] = useState<Key>(-1);
  const [data, setdata] = useState<any>([]);
  const [file, setFile] = useState();

  const storedData = localStorage.getItem("userDetails");
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (storedData) {
      const parseddata = JSON.parse(storedData);
      const data = { 
        userId : parseddata.id,
        fullName: name,
        email: email, 
        phone: phone,
        industry : industry
       };
       event.preventDefault();
   
      const url = "http://localhost:53264/api/Contacts/insertcontact";
      axios
         .post(url, data)
         .then((result) => {
            setName(result.data.name);
            setEmail(result.data.email);
            setPhone(result.data.phone);
            setIndustry(result.data.industry);
            window.location.reload();

         })
         .catch((err) => {
          alert(err.message);
         });
      
    }
  };

 
  useEffect(()=>{
    if (storedData) {
      const parseddata = JSON.parse(storedData);
      const id = parseddata.id;
      const requestBody = { id: id };
      fetch("http://localhost:53264/api/Contacts/getcontact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
    
        .then((data) => {
          // Process the returned data
          console.log(data);
          setdata(data)

         
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      console.error("No ID found in local storage");
    }
  },[])

  const handleImport =()=>{
    if (storedData) {
      const parseddata = JSON.parse(storedData);
      const id = parseddata.id;
      if (file && id) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);
  
        axios
          .post("http://localhost:53264/api/Import_Export/Import", formData)
          .then((response) => {
            console.log("File uploaded successfully");
            setFile(response.data.file);
            window.location.reload();
           
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            
          });
      } else {
        console.log("Please select a file");
      }
    }
  
  }

  const handleExport = () => {
    const csvString = convertArrayOfObjectsToCSV(data);
    const csvDataBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const csvURL = URL.createObjectURL(csvDataBlob);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'contacts.csv');
    tempLink.click();
  };

  const convertArrayOfObjectsToCSV = (data: { [key: string]: string }[]) => {
    const csvArray = [];
    const header = Object.keys(data[0]);
    csvArray.push(header.join(','));

    for (let item of data) {
      const values = header.map((key) => item[key]);
      csvArray.push(values.join(','));
    }

    return csvArray.join('\n');
  };
  const handleFileChange = (e : any) => {
    setFile(e.target.files[0]);
  };
 

  const handleEdit = (id: any) => {
    const element = data.find((item: { id: any; }) => item.id === id);
  
    if (element) {
    
      const { fullName, email, industry } = element;
  
      setEdit(id);
      usetName(fullName);
      usetEmail(email);
      usetIndustry(industry);
    }
  };
 
  
  const handleUpdate = async (id : any) => {
    try {
      const updatedData = {
        "fullName": uname,
        "email": uemail,
        "phone" : uphone,
        "industry": uindustry,
      }
      const response = await fetch(`http://localhost:53264/api/Contacts/updatecontact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        // Data updated successfully
        console.log('Data updated successfully');
        window.location.reload();
      } else {
        // Handle the error if the update was unsuccessful
        throw new Error('Data update failed');
      }
    } catch (error) {
      throw new Error('Data update failed');
    }
  };
  const handleDelete = (id: Key) => {
    fetch('http://localhost:53264/api/Contacts/deletecontact', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
      .then(response => {
        if (response.ok) {
          // User deleted successfully
          console.log('User deleted.');
          window.location.reload();
        } else {
          // Handle error case
          console.error('Failed to delete user.');
        }
      })
      .catch(error => {
        // Handle error case
        console.error('Error:', error);
      });
  };

   

  return (
    <div className="home">
      <SideBar status={status} />

      <section id="content">
        <TopBar />

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Contacts</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Contacts
                  </a>
                </li>
              </ul>
            </div>
            <div className="import-export">
            <Button onClick={handleImport}  className="btn-download">
            <input type="file" onChange={handleFileChange} />
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              Import Contacts
            </Button>
            <Button  onClick={handleExport} className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              Export Contacts
            </Button>
            </div>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Contacts</h3>

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
              <div className="form-div">
                <form action="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />{" "}
                  <br />
                  <button type="submit">Add</button>
                </form>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Industry</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                 data.map((data: {
                   phone: string;
                   email: string;
                   industry: string; id: Key ; fullName: string
                    }) =>
                    data.id === edit ? (
                      <tr>
                        <td>
                          {" "}
                          <input
                            type="text"
                            value={uname}
                            onChange={(e) => usetName(e.target.value)}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            value={uemail}
                            onChange={(e) => usetEmail(e.target.value)}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            value={uphone}
                            onChange={(e) => usetPhone(e.target.value)}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            value={uindustry}
                            onChange={(e) => usetIndustry(e.target.value)}
                          />
                        </td>
                        <td>
                          {" "}
                          <button
                            className="status completed"
                            onClick={() => handleUpdate(data.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr  key ={ data.id }>
                        <td>
                          <p> {data.fullName} </p>
                        </td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.industry}</td>
                        <td>
                          <button >
                            <span
                              className="status completed"
                              onClick={() => handleEdit(data.id)}
                            >
                              Edit
                            </span>
                          </button>
                          <button>
                            <span
                              onClick={() => handleDelete(data.id)}
                              className="status pending"
                            >
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default EmailsContent;
