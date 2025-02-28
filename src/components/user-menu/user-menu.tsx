import "./user-menu.scss";
import { useState } from "react";
import { Link } from "react-router";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={"user-menu"}>
      <div className={"user-menu__avatar"} onClick={() => setIsOpen(!isOpen)}>
        PC
      </div>
      {isOpen && (
        <div className={"user-menu__menu"}>
          <div className={"user-menu__email"}>
            p.chudzinski.spectreit@gmail.com
          </div>
          <div className={"user-menu__divider"} />
          <Link to={"/profile"}>Profile</Link>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
