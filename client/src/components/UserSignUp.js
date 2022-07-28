// Renders a "Sign Up" page for new users

// Renders a "Cancel" button that redirects to '/'

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import { Context } from "../Context";

function UserSignUp() {
  const { data, signIn } = useContext(Context);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const submit = () => {
    data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          signIn(user.emailAddress, user.password)
            .then(() => navigate("/"));
        }
      })
      // catch any errors thrown by the api and log them to the console
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
      <h2>Sign Up</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign Up"
        elements={() => (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={user.firstName}
              onChange={change}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={change}
            />

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
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default UserSignUp;