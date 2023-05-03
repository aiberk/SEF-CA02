const express = require("express");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const router = require("./routes/index");

app.use(express.static("public"));
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// flash messages
const connectFlash = require("connect-flash");
app.use(connectFlash());
// validation
const expressValidator = require("express-validator");
app.use(expressValidator());
// method override
const methodOverride = require("method-override");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// setting up mongoose
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/", {
    dbName: "GPA2",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

// setting up session
const session = require("express-session"); // to handle sessions
app.use(
  session({
    secret: "thisismysessionsecretsuhdijid339u49",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    },
    resave: false,
    saveUninitialized: false,
  })
);
const cookieParser = require("cookie-parser"); // to handle cookies
app.use(cookieParser());

// setting up passport
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

/**
 * Gets uses error controller for unknown urls
 */
app.use(errorController.respondSourceNotFound);
app.use(errorController.respondInternalError);
app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Listening on ${url}`);
});
