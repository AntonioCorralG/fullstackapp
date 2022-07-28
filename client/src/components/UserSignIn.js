// Renders a "Sign In" page for existing users
// Renders a "Sign In" button
// Renders a "Cancel" button that redirects to '/'

import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "./Form";
import { Context } from "../Context";

function UserSignIn() {
  const [user, setUser] = useState({ emailAddress: "", password: "" });
  const [errors, setErrors] = useState([]);
  const { signIn } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  // create the change function
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((user) => ({ ...user, [name]: value }));
  };

  // create the submit function
  const submit = () => {
    const { emailAddress, password } = user;
    signIn(emailAddress, password)
      .then(() => {
        if (emailAddress === "" || password === "") {
          setErrors(["Invalid password or Email"]);
        } else {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        }
      })
      // catch any errors throw by the api and console log them
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  // create the cancel function
  const cancel = () => {
    navigate("/");
  };
  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign In"
        elements={() => (
          <>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={user.emailAddress}
              onChange={change}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={change}
            />
          </>
        )}
      />
      <p>
        Don't have a user account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default UserSignIn;
