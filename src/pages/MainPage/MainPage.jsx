import React from "react";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

import { setLocalStorage } from "../../utils/localstorage";
import { toastInfo } from "../../utils/toasts";

import { MdAccountCircle } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { BiLogOutCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";

function NavBarItems({ logo, to, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-3xl hover:bg-SlackGreen transition duration-200 ease-in bg-Aubergine text-white text-3xl"
    >
      {logo}
    </NavLink>
  );
}

function NavBar() {
  const nav = useNavigate();

  function handleLogout() {
    setLocalStorage("headerData", "[]");
    toastInfo("Thank you for using SlaCord");
    nav("/");
  }

  return (
    <nav className="flex flex-col justify-between gap-2 w-1/12 h-full bg-Horchata p-2">
      <div className="flex flex-col gap-2">
        <NavBarItems to={"/app"} logo={<MdAccountCircle />} />
        <NavBarItems to={"/app/all-users"} logo={<PiUserListBold />} />
        <NavBarItems to={""} logo={<LuUserPlus />} />
        <NavBarItems to={""} logo={"D"} />
        <NavBarItems to={""} logo={<FaPlus />} />
      </div>
      <NavBarItems to={""} logo={<BiLogOutCircle />} onClick={handleLogout} />
    </nav>
  );
}

function MainPage() {
  return (
    <>
      <div className="flex w-full h-screen bg-slate-800">
        <NavBar />
        <div className="p-4 h-full w-full text-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainPage;
