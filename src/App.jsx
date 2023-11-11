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
      <Outlet />
    </>
  );
}

export default App;
