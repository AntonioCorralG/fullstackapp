import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignOut from "./components/UserSignOut";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/UnhandledError";
import UpdateCourse from "./components/UpdateCourse";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import RedirectRoute from "./components/RedirectRoute";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route index element={<CreateCourse />} />
          </Route>
          <Route path="/courses/:id/update" element={<RedirectRoute />}>
            <Route index element={<UpdateCourse />} />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;