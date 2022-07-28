import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

function Header() {
  // call the authenticated user data fro context
  const { authenticatedUser } = useContext(Context);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {authenticatedUser ? (
              <>
                <span>Welcome, {authenticatedUser.firstName}!</span>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li className="header--signedin">
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;