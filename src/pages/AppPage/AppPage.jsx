import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { setLocalStorage } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import { toastInfo } from "../../utils/toasts";

function AppPage() {
  const nav = useNavigate();
  function handleLogout() {
    setLocalStorage("headerData", "[]");
    toastInfo("Thank you for using slacord");
    nav("/");
  }
  return (
    <>
      <div className="flex w-full h-screen bg-slate-800">
        <nav className="flex flex-col justify-between gap-2 w-1/12 h-full bg-Horchata p-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg transition duration-500 ease-in bg-Aubergine text-white text-3xl">
              A
            </div>
            <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg transition duration-500 ease-in bg-Aubergine text-white text-3xl">
              <MdAccountCircle />
            </div>
            <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg transition duration-500 ease-in bg-Aubergine text-white text-3xl">
              C
            </div>
            <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg transition duration-500 ease-in bg-Aubergine text-white text-3xl">
              +
            </div>
          </div>
          <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg transition duration-500 ease-in bg-Aubergine text-white text-3xl">
            <button type="button" onClick={handleLogout}>
              LO
            </button>
          </div>
        </nav>
        <h1 className="p-4 h-10 w-full text-white">
          Welcome to Slack/Discord?
        </h1>
      </div>
    </>
  );
}

export default AppPage;
