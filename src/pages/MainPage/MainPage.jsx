import React from "react";
import { Outlet } from "react-router-dom";
import { Tooltip, TooltipWrapper } from "react-tooltip";

import { LuUserPlus } from "react-icons/lu";
import { NavBar } from "./components/NavBar";
import SideBar from "./components/Dashboard";

function MainPage() {
  return (
    <>
      <div className="flex w-full h-screen bg-[#313338] max-w-[1920px]">
        <NavBar />
        <div className="flex h-full w-full text-white overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainPage;
