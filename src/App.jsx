import { Outlet } from "react-router-dom";
import Slack_Logo from "../src/assets/slack_logo.svg";

/**
 *
 * TODO https://dev.to/wheelmaker24/a-simple-strategy-for-structuring-tailwindcss-classnames-1ba9
 *
 *
 *
 */

function App() {
  return (
    <>
      <header className="flex justify-center items-center w-full h-24 py-4">
        <img src={Slack_Logo} alt="slack_logo" className="h-10" />
      </header>
      <ul className="flex flex-col w-full justify-center items-center text-body text-SlackGreen mb-4">
        ***Still Under Development - Features Implemented:***
        <li>Login - No redirect yet</li>
        <li>Sign up - No redirect yet</li>
        <li>Error validation - Based on API error message</li>
        <li>Local Storage - Signin/Create Account Data and Signin Headers</li>
      </ul>
      <div className="flex flex-col w-full justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}

export default App;
