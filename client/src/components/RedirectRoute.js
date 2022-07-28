import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { Outlet, Navigate, useParams, useNavigate } from "react-router-dom";

function RedirectRoute() {
  const { authenticatedUser, data } = useContext(Context);
  const [course, setCourse] = useState(null);
  const [change, setChange] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    data
      .courseDetail(id)
      .then((res) => setCourse(res))
      .catch((err) => {
        console.log(err);
        navigate("/notfound");
      });
  }, [data, navigate, id]);

  useEffect(() => {
    if (course && authenticatedUser) {
      setLoading(false);
      course.userId === authenticatedUser.id
        ? setChange(true)
        : setChange(false);
    } else {
      setLoading(true);
    }
  }, [course, authenticatedUser]);

  return authenticatedUser ? (
    <>{Loading ? <></> : change ? <Outlet /> : <Navigate to="/forbidden" />}</>
  ) : (
    navigate("/forbidden")
  );
}

export default RedirectRoute;
