import { useNavigate, NavLink } from "react-router-dom";

import { toastInfo, setLocalStorage } from "../../../utils";

import { GoPeople, GoListOrdered, GoSignOut, GoPlus } from "react-icons/go";

function NavBarItems({ name, logo, to, onClick, id }) {
  return (
    // <Tooltip content={name} place="right" anchorSelect={id}>

    /**
     * TODO: ADD TOOLTIP AND ACTIVE STATE FOR NAVLINK
     */
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
export function NavBar() {
  const nav = useNavigate();

  function handleLogout() {
    setLocalStorage("headerData", "[]");
    toastInfo("Thank you for using SlaCord");
    nav("/");
  }

  return (
    <nav className="flex flex-col justify-between w-[5%] min-w-[80px] h-full bg-[#1e1f22] py-4 px-2">
      <div className="flex flex-col items-center gap-2">
        <NavBarItems id="1" name="Home" to={"/app"} logo={<GoPeople />} />
        <NavBarItems
          id="2"
          name="All Users"
          to={"/app/all-users"}
          logo={<GoListOrdered />}
        />
        {/* 
        
        TODO: Insert Channel Icons Here
        
        */}

        <NavBarItems to={"/app/create-channel"} logo={<GoPlus />} />
      </div>
      <div className="flex justify-center items-center">
        <NavBarItems to={""} logo={<GoSignOut />} onClick={handleLogout} />
      </div>
    </nav>
  );
}
