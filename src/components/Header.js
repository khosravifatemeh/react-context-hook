import React, { useContext } from "react";
import { AuthContext } from "App";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const handleClick = () => {
    return dispatch({ type: "LOGOUT" });
  };
  return (
    <nav id="navigation">
      <h1 className="logo">HOOKED</h1>
      {state.isAuthenticated && (
        <div className="logout">
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};
export default Header;
