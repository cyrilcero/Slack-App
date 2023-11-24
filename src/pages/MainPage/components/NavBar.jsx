import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toastInfo, deleteLocalStorage } from "../../../utils";
import {
  GoDiscussionClosed,
  GoPersonFill,
  GoListOrdered,
  GoSignOut,
  GoPlus,
} from "react-icons/go";

function NavBarItems({ name, logo, to, onClick, id }) {
  return (
    <NavLink
      id={id}
      to={to}
      onClick={onClick}
      className="flex justify-center items-center w-11/12 aspect-square rounded-full hover:rounded-3xl hover:bg-SlackGreen transition duration-200 ease-in bg-[#2b2d31] text-SlackGreen hover:text-white text-3xl"
    >
      {logo}
    </NavLink>
    // </Tooltip>
  );
}

export function Logout() {
  const navigate = useNavigate();
  function handleLogout() {
    deleteLocalStorage("headerData");
    deleteLocalStorage("LoginData");
    toastInfo("Thank you for using SlaCord");
    navigate("/");
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen p-4 bg-[#313338]">
        <div className="flex flex-col w-1/4 h-auto bg-[#070707] p-8 rounded-xl text-white">
          <h1 className="text-3xl text-center font-bold py-4">
            Leaving already?{" "}
          </h1>
          <div className="flex item-center justify-center gap-4 pt-4">
            <button
              className="bg-transparent rounded-lg h-12 p-2 px-6"
              onClick={() => navigate("/app")}
            >
              Close
            </button>
            <button
              onClick={handleLogout}
              className={"bg-SlackGreen rounded-lg h-12 p-2 px-6"}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col justify-between w-[5%] min-w-[80px] h-full bg-[#1e1f22] py-4 px-2">
      <div className="flex flex-col items-center gap-2">
        <NavBarItems
          id="1"
          name="Home"
          to={"/app"}
          logo={<GoDiscussionClosed />}
        />
        <NavBarItems
          id="2"
          name="All Users"
          to={"/app/all-users"}
          logo={<GoListOrdered />}
        />
        {/* <NavBarItems to={"/app/create-channel"} logo={<GoPlus />} /> */}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <NavBarItems to={""} logo={<GoPersonFill />} />
        <NavBarItems
          to={""}
          logo={<GoSignOut />}
          onClick={() => navigate("/logout")}
        />
      </div>
    </nav>
  );
}
