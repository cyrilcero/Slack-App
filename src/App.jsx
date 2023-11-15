import { Outlet } from "react-router-dom";
import Slack_Logo from "../src/assets/slack_logo.svg";
import Warning from "../src/assets/Warning.png";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <header className="flex justify-center items-center w-full h-24 py-4">
        <img src={Slack_Logo} alt="slack_logo" className="h-10" />
      </header>
      <img src={Warning} alt="" className="" />
      <div className="flex flex-col w-full justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
