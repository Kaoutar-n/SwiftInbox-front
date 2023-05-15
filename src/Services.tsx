import "./Login.css";
import Feature from "./feature/Feature";
import blueAbout from "./img/blueAbout.png";
import './services.css'

const featuresData=[
  {
    title:'Email categorization ',
    text:'Categorizing incoming emails based on their type, urgency, and priority, making it easier to manage and respond to them efficiently.'
  },
  {
    title:'Customized email templates',
    text:' Creating customized email templates for commonly used responses, saving time and ensuring consistency in communication.'
  },
  {
    title:'Automated email responses',
    text:'Setting up automated responses for common inquiries and requests, improving response time and reducing workload.'
  },
  {
    title:'Reporting and analytics',
    text:'Providing detailed reports and analytics on email activity, including response time, email volume, and customer satisfaction.'
  }
]
export const Services = () => {
  return (
    <>
     <div className="gpt3__features section__padding" id="features">
      <div className="gpt3__features-heading">
        <h1>
        Revolutionize Your Email Management with SwiftInbox
        </h1>
        <p>Request Early Access to Get Started</p>
      </div>
      <div className="gpt3__features-container">
        {featuresData.map((item,index) => (
          <Feature  title={item.title} text={item.text} key={item.text + index} />
        ))}
      </div>
    </div>

    </>
  );
};

export default Services;




