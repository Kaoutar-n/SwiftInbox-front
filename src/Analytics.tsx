import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import "./Charts";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
// import './script'
export function Analytics() {
  const status = 'analytics';
  return (
    <div className="home">
      <SideBar status={status}/>
      <section id="content">
        <TopBar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Analytics</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Recent Analytics</h3>
              </div>
              <div className="graphBox">
                <div className="box">
                  <canvas id="myChart"> </canvas>
                </div>
                <div className="box">
                  {" "}
                  <canvas id="mySecondChart"> </canvas>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
export default Analytics;
