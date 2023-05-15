import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import Forgot from "./forgotpassword";
import Register from "./Register";
import About from "./About";
import ReadMore from "./ReadMore";
import ContactUs from "./ContactUs";
import Services from "./Services";
import PageNotFound from "./PageNotFound";
import EmailsContent from "./EmailsContent";
import Analytics from "./Analytics";
import { MainHome } from "./MainHome";
import Emails from "./Emails";
import MailingService from "./MailingService";
import Send from "./MailingService/Send";
import Costume from "./MailingService/Costume";
import ViewEmail from "./ViewEmail";
import { Profile } from "./Profile";
import TableTemp from "./TableTemp";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div>
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
          <Route element={<ProtectedRoutes/>}>
          <Route path="/Home" element={<Home />} />
          <Route path="/EmailsContent" element={<EmailsContent />} />
          <Route path="/Analytics" element={<Analytics />} />
          
          <Route path="/Emails" element={<Emails />} />
          <Route path="/Send" element={<Send />} />
          <Route path="/Costume" element={<Costume />} />
          <Route path="/ViewEmail" element={<ViewEmail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MailingService" element={<MailingService />} />
          <Route path="/TableTemp" element={<TableTemp />} />
          </Route>
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
