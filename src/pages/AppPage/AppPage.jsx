import React from "react";

function AppPage() {
  return (
    <>
      <div className="flex w-full h-screen bg-slate-800">
        <nav className="flex flex-col gap-2 w-1/12 h-full bg-Horchata p-2">
          <div className="flex justify-center items-center w-full aspect-square rounded-full bg-Aubergine text-white text-3xl">
            A
          </div>
          <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg bg-Aubergine text-white text-3xl">
            B
          </div>
          <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg bg-Aubergine text-white text-3xl">
            C
          </div>
          <div className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-lg bg-Aubergine text-white text-3xl">
            +
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
