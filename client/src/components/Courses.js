/* Retrieves all courses from /api/courses
 Each course is a link to /courses/:id
 Renders a link to "Create Course" */

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const { data } = useContext(Context);

  useEffect(() => {
    data
      .getCourses()
      .then((res) => setCourses(res))
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <div className="wrap main--grid">
      {courses.map((course, index) => (
        <Link
          to={`courses/${course.id}`}
          key={index}
          className="course--module course--link"
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link
        to={`courses/create`}
        className="course--add--module course--module"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}

export default Courses;
