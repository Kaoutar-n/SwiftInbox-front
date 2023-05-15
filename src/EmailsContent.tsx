import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import "./home.css";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Users } from "./users.js";
import { FormEvent } from "react";
// import './script'
export function EmailsContent() {
  const status = "contacts";
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [uname, usetName] = useState("");
  const [uemail, usetEmail] = useState("");
  const [udate, usetDate] = useState("");
  const [edit, setEdit] = useState(-1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = Users.length + 1;
    Users.push({
      id: id,
      first_name: name,
      last_name: "",
      email: email,
      gender: date,
    });
    setName("");
    setEmail("");
    setDate("");
  };
  const handleEdit = (id: number) => {
    setEdit(id);
    usetName(Users[id - 1].first_name);
    usetEmail(Users[id - 1].email);
    usetDate(Users[id - 1].gender);
  };
  const handleUpdate = (id: number) => {
    const index = Users.findIndex((user) => user.id === id);
    Users[index] = {
      id: id,
      first_name: uname,
      last_name: "",
      email: uemail,
      gender: udate,
    };
    setEdit(-1);
  };
  const handleDelete = (id: number) => {
    const userIndex = Users.findIndex((user) => user.id === id);
    
      Users.splice(userIndex, 1);
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
            <a href="" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Import Contacts</span>
            </a>
            <a href="" className="btn-download">
            <FontAwesomeIcon icon={faCloudArrowUp}  className="ico"/>
              <span className="text">Export Contacts</span>
            </a>
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
                    placeholder="Enter Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                    <th>date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.filter((user) =>
                    user.first_name.toLowerCase().includes(query)
                  ).map((user) =>
                    user.id === edit ? (
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
                            value={udate}
                            onChange={(e) => usetDate(e.target.value)}
                          />
                        </td>
                        <td>
                          {" "}
                          <button
                            onClick={() => handleUpdate(user.id)}
                            className="status completed"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={user.id}>
                        <td>
                          <p> {user.first_name} </p>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>
                          <button>
                            <span
                              className="status completed"
                              onClick={() => handleEdit(user.id)}
                            >
                              Edit
                            </span>
                          </button>
                          <button>
                            <span
                              onClick={() => handleDelete(user.id)}
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
