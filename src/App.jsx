import { Outlet } from "react-router-dom";
import Slack_Logo from "../src/assets/slack_logo.svg"

function App() {
  return (
    <>
    <header className="w-full h-5">
      <img src={Slack_Logo} alt="slack_logo" className="h-5"/>
    </header>
      <Outlet />
    </>
  );
}

export default App;
