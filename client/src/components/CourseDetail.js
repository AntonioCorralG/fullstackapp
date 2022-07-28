/* Displays a course's details from /api/courses/:id
 Renders a "Delete Course" button for deleting a course
 Renders a "Edit Course" button for editing a course */

import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail() {
  // get data and unthenticated user for the context api
  const { data, authenticatedUser } = useContext(Context);
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    data
      .courseDetail(id)
      .then((res) => setCourse(res))
      .catch((err) => {
        console.log(err);
        navigate("/notfound");
      });
  }, [data, id, navigate]);

  useEffect(() => {
    if (course && authenticatedUser && course.userId === authenticatedUser.id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [course, authenticatedUser]);

  const deleteCourse = () => {
    data
      .deleteCourse(course.id, authenticatedUser)
      .then((errors) => {
        if (errors) {
          console.log(errors);
        } else {
          console.log("Course deleted");
        }
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  //create an updateCourse function that navigates to the the update page for
  const updateCourse = () => navigate(`/courses/${course.id}/update`);

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {isEditing ? (
            <>
              <button className="button" onClick={updateCourse}>
                Update Course
              </button>
              <button className="button" onClick={deleteCourse}>
                Delete Course
              </button>
            </>
          ) : (
            <></>
          )}
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2 className="course--detail--label">Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <p className="course--name">{course.title}</p>
              {course.User ? (
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
              ) : (
                <></>
              )}

              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown class="course--detail--list">
                {course.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseDetail;
