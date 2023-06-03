import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import "./home.css";
import { Key, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

import { FormEvent } from "react";

import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import  API  from "../API";

export function EmailsContent() {
  const storedData = localStorage.getItem("userDetails");
  const parseddata = JSON.parse(storedData!);
  const id = parseddata.id;
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
  const [isLoading, setIsLoading] = useState(true);
  const [dataExist, setDataExist] = useState(false)

  const [addContact, setaddContact] = useState(false);
  const toggleAddContact = () => {
    setaddContact(!addContact);
  };

  function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^06\d{8}$/;
    if(phoneNumberRegex.test(phoneNumber)){
      setPhone(phone);
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

  const toggleAddContactRemove = () => {
    if (addContact === true) {
      setaddContact(false);
    }
  };

  

  const GetData = () => {
    if (id) {
      const requestBody = { id: id };
      fetch(`${API.Link}Contacts/getcontact`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())

        .then((data) => {

          if(data !== undefined) {
            setIsLoading(false);
          }else{
            setDataExist(true);
          }
            setdata(data);

        })
        .catch((error) => {
          console.error("Error: ", error);
          toast.error("No Data Found!");
        });
    } else {
      console.error("No ID found in local storage");
    }
  };

  const handleSubmit = () => {
    if(validateEmail(email) && validatePhoneNumber(phone)){
      if (storedData) {
        const parseddata = JSON.parse(storedData);
        const data = {
          userId: parseddata.id,
          fullName: name,
          email: email,
          phone: phone,
          industry: industry,
        };
        const url = `${API.Link}Contacts/insertcontact`;
        axios
          .post(url, data)
          .then((result) => {
            setName("");
            setEmail("");
            setPhone("");
            setIndustry("");
            GetData();
            toast.success("User Added Successfuly!");
            toggleAddContact();
          })
          .catch((err) => {
            alert(err.message);
            toast.error("Failed To Add The User!");
          });
      }
    }else if(validateEmail(email) && !validatePhoneNumber(phone)){
        toast.error("phone number invalid!")
    }else{
      toast.error("email  invalid!")
    }
   
  };

  useEffect(() => {
    id && GetData();
  }, []);

  const handleImport = () => {
    if (file && id) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);

      axios
        .post(`${API.Link}Import_Export/Import`, formData)
        .then((response) => {
          console.log("File uploaded successfully");
          setFile(response.data.file);
          GetData();
          toast.success("Users Added Successfuly!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Failed To Add The User!");
        });
    } else {
      console.log("Please select a file");
    }
  };

  const handleExport = () => {
    const csvString = convertArrayOfObjectsToCSV(data);
    const csvDataBlob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const csvURL = URL.createObjectURL(csvDataBlob);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "contacts.csv");
    tempLink.click();
    toast.success("Users Exported Successfuly!");
  };

  const convertArrayOfObjectsToCSV = (data: { [key: string]: string }[]) => {
    const csvArray = [];
    const header = Object.keys(data[0]);
    csvArray.push(header.join(","));

    for (let item of data) {
      const values = header.map((key) => item[key]);
      csvArray.push(values.join(","));
    }

    return csvArray.join("\n");
  };
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (id: any) => {
    const element = data.find((item: { id: any }) => item.id === id);

    if (element) {
      const { fullName, email, phone, industry } = element;

      setEdit(id);
      usetName(fullName);
      usetEmail(email);
      usetPhone(phone);
      usetIndustry(industry);
    }
  };

  const handleUpdate = async (id: any) => {
    if(validateEmail(uemail) && validatePhoneNumber(uphone)){
      try {
        const updatedData = {
          fullName: uname,
          email: uemail,
          phone: uphone,
          industry: uindustry,
        };
        const response = await fetch(
          `${API.Link}Contacts/updatecontact/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );
    
        if (response.ok) {
          // Data updated successfully
          console.log("Data updated successfully");
          GetData();
          toast.success("User Updated Succesfuly!");
          setEdit(-1); // Reset the edit state to -1
          usetName(""); // Reset the input states
          usetEmail("");
          usetPhone("");
          usetIndustry("");
        } else {
          throw new Error("Data update failed");
        }
      } catch (error) {
        throw new Error("Data update failed");
      }
      setEdit(-1);
    }else if(validateEmail(uemail) && !validatePhoneNumber(uphone)){
      toast.error("Please enter a valid Phone Number!");
    }else{
      toast.error("Please enter a valid Email!");
    }
    
  };
  //Delete
  const handleDelete = (id: Key) => {
    fetch(`${API.Link}Contacts/deletecontact`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User deleted.");
          GetData();
          toast.success("User Deleted Succesfuly!");
        } else {
          // Handle error
          toast.error("Failed to delete user !");
          console.error("Failed to delete user.");
        }
      })
      .catch((error) => {
        // Handle error case
        console.error("Error:", error);
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
              <div className="image-input">
                <Button
                  style={{ color: "white", background: "none" }}
                  onClick={handleImport}  className="btn-download"
                >
                  <label htmlFor="file">
                    {" "}
                    <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
                    Import Contacts
                  </label>
                  <input id="file" type="file" onChange={handleFileChange} />
                </Button>
              </div>
              <div className="image-input">
                <Button onClick={handleExport} className="btn-download">
                  <label htmlFor="">
                    {" "}
                    <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
                    Export Contacts
                  </label>
                </Button>
              </div>
            </div>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Contacts</h3>

                <Button
                  style={{ color: "white", background: "#3c91e6" }}
                  onClick={toggleAddContact}
                  className="btn-download"
                >
                  Add Contact
                </Button>
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
              </div>
              {addContact && (
                <>
                  <div
                    className="overlay"
                    onClick={toggleAddContactRemove}
                  ></div>
                  <div className="form-div">
                    <div className="form-title">Add Contact</div>
                    <form >
                      <div className="add-contact-data">
                      <div className="form-input-contact">
                      <span className="form-details">Full Name</span>
                        <input
                          type="text"
                          placeholder="Enter Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-input-contact">
                        <span className="form-details">Email</span>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-input-contact">
                      <span className="form-details">Industry</span>
                        <input
                          type="text"
                          placeholder="Enter Industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        />
                      </div>
                      <div className="form-input-contact">
                      <span className="form-details">Phone</span>
                        <input
                          type="text"
                          placeholder="Enter phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>{" "}
                    
                     
                      </div>
                      <Button onClick={() => handleSubmit()} style={{ color: "white", background: "#3c91e6", marginTop:"25px", marginBottom:'25px', fontSize:'16px'  }} >ADD</Button>
                    </form>
                  </div>
                </>
              )}
              <div className="table-wrapper">
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
                    {isLoading ? (
                    <tr>
                      <td colSpan={5}>Loading...</td>
                    </tr>
                  ) : dataExist ? (
                    <tr>
                      <td colSpan={5}>No data found</td>
                    </tr>
                  ) :data.map(
                      (data: {
                        phone: string;
                        email: string;
                        industry: string;
                        id: Key;
                        fullName: string;
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
                          <tr key={data.id}>
                            <td>
                               {data.fullName}
                            </td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.industry}</td>
                            <td>
                              <button>
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
          </div>
        </main>
      </section>
    </div>
  );
}
export default EmailsContent;
