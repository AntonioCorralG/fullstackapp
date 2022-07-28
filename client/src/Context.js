import React, { useState, useEffect } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

export const Context = React.createContext();

export const Provider = (props) => {
  // create a userCookies instance in the state and set it to get the cookies
  const [userCookies] = useState(Cookies.get("userCookies"));

  const [authenticatedUser, setAuthenticatedUser] = useState(
    userCookies ? JSON.parse(userCookies) : null
  );

  useEffect(() => {
    if (authenticatedUser) {
      Cookies.set("userCookies", JSON.stringify(authenticatedUser), {
        expires: 1,
      });
    }
  }, [authenticatedUser]);

  const data = new Data();

  //   create a signIn async function with emailAddress and password as params
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      setAuthenticatedUser(user);
    }
  };

  //   create a signOut function
  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove("userCookies");
  };

  return (
    <Context.Provider value={{ signIn, signOut, data, authenticatedUser }}>
      {props.children}
    </Context.Provider>
  );
};
