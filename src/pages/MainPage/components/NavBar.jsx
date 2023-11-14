import { useNavigate, NavLink } from "react-router-dom";

import { setLocalStorage } from "../../../utils/localstorage";
import { toastInfo } from "../../../utils/toasts";

import { MdAccountCircle } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { BiLogOutCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

function NavBarItems({ name, logo, to, onClick, id }) {
  return (
    // <Tooltip content={name} place="right" anchorSelect={id}>
    <NavLink
      id={id}
      to={to}
      onClick={onClick}
      className="flex justify-center items-center w-full aspect-square rounded-full hover:rounded-3xl hover:bg-SlackGreen transition duration-200 ease-in bg-Aubergine text-white text-3xl"
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
    <nav className="flex flex-col justify-between gap-2 w-1/12 h-full bg-Horchata p-2">
      <div className="flex flex-col gap-2">
        <NavBarItems
          id="1"
          name="Home"
          to={"/app"}
          logo={<MdAccountCircle />}
        />
        <NavBarItems
          id="2"
          name="All Users"
          to={"/app/all-users"}
          logo={<PiUserListBold />}
        />
        <NavBarItems to={"/app/create-channel"} logo={<FaPlus />} />
      </div>
      <NavBarItems to={""} logo={<BiLogOutCircle />} onClick={handleLogout} />
    </nav>
  );
}
