import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Dashboard/Home";
import Forgot from "./forgotpassword";
import Register from "./Register";
import About from "./About";
import ReadMore from "./ReadMore";
import ContactUs from "./ContactUs";
import Services from "./Services";
import PageNotFound from "./PageNotFound";
import EmailsContent from "./Dashboard/EmailsContent";
import Analytics from "./Dashboard/Analytics";
import { MainHome } from "./MainHome";
import Emails from "./Dashboard/Emails";
import MailingService from "./Dashboard/MailingService";
import Send from "./Dashboard/MailingService/Send";
import Costume from "./Dashboard/MailingService/Costume";
import ViewEmail from "./Dashboard/ViewEmail";
import { Profile } from "./Dashboard/Profile";
import TableTemp from "./TableTemp";

import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./ResetPassword";

function App(): JSX.Element {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/MainHome" element={<MainHome />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="/ReadMore" element={<ReadMore />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route
            path="/home/*"
            element={<PrivateRoute path="/home" element={<Home />} />}
          />
          <Route
            path="/EmailsContent"
            element={
              <PrivateRoute path="/EmailsContent" element={<EmailsContent />} />
            }
          />
          <Route
            path="/Analytics"
            element={<PrivateRoute path="/Analytics" element={<Analytics />} />}
          />
          <Route
            path="/Emails"
            element={<PrivateRoute path="/Emails" element={<Emails />} />}
          />
          <Route
            path="/Send"
            element={<PrivateRoute path="/Send" element={<Send />} />}
          />
          <Route
            path="/Costume"
            element={<PrivateRoute path="/Costume" element={<Costume />} />}
          />
          <Route
            path="/ViewEmail"
            element={<PrivateRoute path="/ViewEmail" element={<ViewEmail />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute path="/profile" element={<Profile />} />}
          />
          <Route
            path="/MailingService"
            element={
              <PrivateRoute
                path="/MailingService"
                element={<MailingService />}
              />
            }
          />
          <Route
            path="/TableTemp"
            element={<PrivateRoute path="/TableTemp" element={<TableTemp />} />}
          />

          {/* <PrivateRoute path="/EmailsContent" element={<EmailsContent />} />
          <PrivateRoute path="/Analytics" element={<Analytics />} />
          <PrivateRoute path="/Emails" element={<Emails />} />
          <PrivateRoute path="/Send" element={<Send />} />
          <PrivateRoute path="/Costume" element={<Costume />} />
          <PrivateRoute path="/ViewEmail" element={<ViewEmail />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <PrivateRoute path="/MailingService" element={<MailingService />} />
          <PrivateRoute path="/TableTemp" element={<TableTemp />} /> */}

          <Route
            path="/forgotpassword"
            element={
              <Forgot
                onFormSwitch={function (formName: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
