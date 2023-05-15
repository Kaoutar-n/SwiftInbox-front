import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleRight, faEnvelopeCircleCheck, faCalendarCheck, faPaperPlane, faFilter, faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

// import './script'
export function Home() {
  const status = 'dashboard';
  return (
    <div className="home">
      <SideBar status={status}/>

      <section id="content">
        <TopBar />

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            {/* <a href="" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Download PDF</span>
            </a> */}
          </div>
          <ul className="box-info">
            <li>
              <i className="ico">
                <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
              </i>
              <span className="text">
                <h3>20</h3>
                <p>New Mails</p>
              </span>
            </li>
            <li>
              <i className="ico">
                <FontAwesomeIcon icon={faPaperPlane} />
              </i>

              <span className="text">
                <h3>15</h3>
                <p>Sent</p>
              </span>
            </li>
            <li>
              <i className="ico">
                {" "}
                <FontAwesomeIcon icon={faCalendarCheck} />
              </i>
              <span className="text">
                <h3>35</h3>
                <p>Total</p>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Recent Mails</h3>

                <i className="ico">
                  <FontAwesomeIcon icon={faSearch} />
                </i>
                <i className="ico">
                  <FontAwesomeIcon icon={faFilter} />
                </i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Receiver</th>
                    <th>Date</th>
                    <th>Status </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <p>Jhon Doe</p>
                    </td>
                    <td>01-01-2023</td>
                    <td>
                      {" "}
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <p>Jhon Doe</p>
                    </td>
                    <td>01-01-2023</td>
                    <td>
                      {" "}
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <p>Jhon Doe</p>
                    </td>
                    <td>01-01-2023</td>
                    <td>
                      {" "}
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <p>Jhon Doe</p>
                    </td>
                    <td>01-01-2023</td>
                    <td>
                      {" "}
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <p>Jhon Doe</p>
                    </td>
                    <td>01-01-2023</td>
                    <td>
                      {" "}
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <i className="ico">
                  <FontAwesomeIcon icon={faPlus} />
                </i>
                <i className="ico">
                  <FontAwesomeIcon icon={faFilter} />
                </i>
              </div>
              <ul className="todolist">
                <li className="not-completed">
                  <p>Todo List</p>
                  <i>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="ico"
                    />
                  </i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="ico"
                    />
                  </i>
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="ico"
                    />
                  </i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="ico"
                    />
                  </i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="ico"
                    />
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
