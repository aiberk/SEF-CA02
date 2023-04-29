const User = require("../models/User"); // Require the User model
const passport = require("passport"); // Require the passport package

const getUserParams = (body) => {
  // Define a function that returns an object with the user's parameters from the request body
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    zipCode: body.zipCode,
  };
};

module.exports = {
  index: (req, res, next) => {
    // Controller function for the user index page
    User.find({}) // Find all users in the database
      .then((users) => {
        res.locals.users = users; // Set the users as a local variable
        next(); // Call the next middleware function
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`); // Log any errors
        next(error); // Call the error-handling middleware function
      });
  },

  indexView: (req, res) => {
    // Controller function for rendering the user index page
    res.render("user/index"); // Render the index view
  },

  new: (req, res) => {
    // Controller function for rendering the new user page
    res.render("user/new"); // Render the new user view
  },

  create: (req, res, next) => {
    // Controller function for creating a new user
    console.log(req.body); // Log the request body
    if (req.skip) return next(); // If there were validation errors, skip to the next middleware function
    let newUser = new User(getUserParams(req.body)); // Create a new User object with the user's parameters
    User.register(newUser, req.body.password, (error, user) => {
      // Register the new user with passport-local-mongoose
      if (user) {
        // If the user was created successfully
        req.flash("success", `${user.name}'s account created successfully!`); // Flash a success message
        res.locals.redirect = "/user"; // Set the redirect path
        next(); // Call the next middleware function
      } else {
        // If there was an error creating the user
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        ); // Flash an error message
        res.locals.redirect = "/user/new"; // Set the redirect path
        next(); // Call the next middleware function
      }
    });
  },

  redirectView: (req, res, next) => {
    // Middleware function to handle redirects
    let redirectPath = res.locals.redirect; // Get the redirect path from the local variables
    if (redirectPath)
      res.redirect(redirectPath); // If there is a redirect path, redirect to it
    else next(); // Call the next middleware function
  },

  show: (req, res, next) => {
    // Controller function for showing a user's profile
    let userId = req.params.id; // Get the user ID from the request parameters
    User.findById(userId) // Find the user by ID
      .then((user) => {
        res.locals.user = user; // Set the user as a local variable
        next(); // Call the next middleware function
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log any errors
        next(error); // Call the error-handling middleware function
      });
  },

  showView: (req, res) => {
    // Controller function for rendering the user profile
    res.render("user/show"); // Render the user profile view
  },

  edit: (req, res, next) => {
    // Controller function for rendering the edit user page
    let userId = req.params.id; // Get the user ID from the request parameters
    User.findById(userId) // Find the user by ID
      .then((user) => {
        if (
          (req.isAuthenticated() && req.user._id.equals(user._id)) ||
          (req.isAuthenticated() && req.user.isAdmin === true)
        ) {
          // If the user is authenticated and authorized to edit the user
          res.render("user/edit", {
            user: user,
          }); // Render the edit user view
        } else {
          // If the user is not authorized to edit the user
          req.flash("error", "You are not authorized to perform this action."); // Flash an error message
          res.redirect("/user"); // Redirect to the user index page
        }
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log any errors
        next(error); // Call the error-handling middleware function
      });
  },

  update: (req, res, next) => {
    // Controller function for updating a user's profile
    let userId = req.params.id, // Get the user ID from the request parameters
      userParams = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
      };
    User.findByIdAndUpdate(
      userId,
      {
        $set: userParams,
      },
      { new: true }
    ) // Update the user's profile with the new parameters
      .then((user) => {
        res.locals.redirect = `/user/${userId}`; // Set the redirect path
        res.locals.user = user; // Set the user as a local variable
        next(); // Call the next middleware function
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`); // Log any errors
        next(error); // Call the error-handling middleware function
      });
  },

  delete: (req, res, next) => {
    // Controller function for deleting a user
    let userId = req.params.id; // Get the user ID from the request parameters

    User.findById(userId) // Find the user by ID
      .then((user) => {
        if (
          (req.isAuthenticated() && req.user._id.equals(user._id)) ||
          (req.isAuthenticated() && req.user.isAdmin === true)
        ) {
          // If the user is authenticated and authorized to delete the user
          User.findByIdAndRemove(userId) // Remove the user from the database
            .then(() => {
              res.redirect("/user"); // Redirect to the user index page
            })
            .catch((error) => {
              console.log(`Error deleting user by ID: ${error.message}`); // Log any errors
              next(); // Call the next middleware function
            });
        } else {
          // If the user is not authorized to delete the user
          req.flash("error", "You are not authorized to perform this action."); // Flash an error message
          res.redirect("/user"); // Redirect to the user index page
        }
      })
      .catch((error) => {
        console.log(`Error finding user by ID: ${error.message}`); // Log any errors
        next(); // Call the next middleware function
      });
  },

  login: (req, res) => {
    // Controller function for rendering the login page
    res.render("user/login"); // Render the login view
  },

  authenticate: passport.authenticate("local", {
    // Middleware function for authenticating a user's login credentials
    failureRedirect: "/user/login", // If login fails, redirect to the login page
    failureFlash: "Failed to login.", // Flash an error message
    successRedirect: "/", // If login succeeds, redirect to the home page
  }),

  validate: (req, res, next) => {
    // Middleware function for validating user input
    req.sanitizeBody("email").trim(); // Sanitize the email input
    req.check("email", "Email is invalid").isEmail(); // Check if the email is valid
    req.check("password", "Password cannot be empty").notEmpty(); // Check if the password is empty
    req.check("zipCode", "Zip code can not be empty").notEmpty(); // Check if the zip code is empty
    req.check("zipCode", "Zip code should be numbers").isInt(); // Check if the zip code is a number
    req.check("zipCode", "Zip code should have 5 digits").isLength({
      min: 5,
      max: 5,
    }); // Check if the zip code has 5 digits
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg); // Map the error messages to an array
        req.skip = true; // Set the skip flag to true
        req.flash("error", messages.join(" and ")); // Flash an error message
        res.locals.redirect = "/user/new"; // Set the redirect path
        next(); // Call the next middleware function
      } else {
        next(); // Call the next middleware function
      }
    });
  },

  logout: (req, res, next) => {
    // Controller function for logging out a user
    req.logout(function (err) {
      if (err) {
        return next(err); // Call the error-handling middleware function
      }
      req.flash("success", "You have been logged out!"); // Flash a success message
      res.locals.redirect = "/"; // Set the redirect path
      next(); // Call the next middleware function
    });
  },

  isAuthenticated: (req, res, next) => {
    // Middleware function for checking if a user is authenticated
    if (req.isAuthenticated()) {
      // If the user is authenticated
      return next(); // Call the next middleware function
    }
    req.flash("error", "You must be logged in to perform this action."); // Flash an error message
    res.redirect("/user/login"); // Redirect to the login page
  },
};
