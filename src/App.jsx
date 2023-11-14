import { Outlet } from "react-router-dom";
import Slack_Logo from "../src/assets/slack_logo.svg";
import Warning from "../src/assets/Warning.png";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <header className="flex justify-center items-center w-full h-24 py-4">
        <img src={Slack_Logo} alt="slack_logo" className="h-10" />
      </header>
      <ul className="flex flex-col w-full justify-center items-center text-body text-SlackGreen mb-4">
        ***Still Under Development - Features Implemented:***
        <li>-------------</li>
        <li>Login, Sign up, list all users</li>
        <li>Error validation - Based on API error message</li>
        <li>Local Storage - Signin/Create Account Data and Signin Headers</li>
        <li>Logout</li>
      </ul>
      <img src={Warning} alt="" className="" />
      <div className="flex flex-col w-full justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
