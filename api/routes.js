"use strict";

const express = require("express");

// Construct a router instance.
const router = express.Router();
const User = require("./models").User;
const Course = require("./models").Course;
const { authenticateUser } = require('./middleware/auth-user');
const { asyncHandler } = require('./middleware/async-handler');




// Route that returns a list of users.
router.get(
  "/users", authenticateUser,
  asyncHandler(async (req, res) => {
    
    const user = req.currentUser;
    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
  })
);

// Route that creates a new user.
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location('/').json({ message: "Account successfully created!" }).end();
    } catch (error) {
      console.log("ERROR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
router.get( "/courses", asyncHandler(async (req, res)=> {
    let courses = await Course.findAll( {
        //includes the user in the course
        include: [{
            model: User,
        }]
    });
    if (courses) {
        res.status(200).json(courses);
    } else {
    res.status(404).json({ message: "No courses currently exist."})
    }
}))

//GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const courses = await Course.findByPk(req.params.id, {
        //includes the user in the course
        include: [{
            model: User,
        }]
    });
    if (courses) {
        res.status(200).json(courses);
    } else {
    res.status(404).json({ message: "Unable to find course."})
    }  }));

//POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    let courses;
    try {
      courses = await Course.create(req.body);
      res.status(201).location(`/api/courses/${courses.id}`).end();
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }));
//PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put('/courses/:id', authenticateUser, asyncHandler( async(req, res) => {
    try {
        const courses = await Course.findByPk(req.params.id);
        if (courses) {
            //update corresponding course 
            await courses.update(req.body);
            //return 204 HTTP status code and no content
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        // add validation
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));
//DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const courses = await Course.findByPk(req.params.id);
    if (courses) {
        // delete corresponding course
        await courses.destroy();
        // return 204 HTTP status code and no content
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Unable to find course' });
    }
}));


module.exports = router;
