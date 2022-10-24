const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");

const app = express();
const bodyParser = require('body-parser');
const { createServer } = require("http");
const server = createServer(app);
const port = 8000;

const uri = "mongodb+srv://admin:admin12345@cluster0.pzm0h.mongodb.net/todoGenie?retryWrites=true&w=majority";
const GOOGLE_CLIENT_ID = "465272069084-thehp3rgl4ji68pf4m65l7d2bbrcn34j.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todos"));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
      {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:8000/auth/google/callback",
          passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
          console.log(profile);
          console.log(accessToken);

          return done(null, profile);
      }
  )
);

// login 화면
// 이미 로그인한 회원이라면(session 정보가 존재한다면) main화면으로 리다이렉트
app.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  fs.readFile("./webpage/login.html", (error, data) => {
      if (error) {
          console.log(error);
          return res.sendStatus(500);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
  });
});

// login 화면
// 로그인 하지 않은 회원이라면(session 정보가 존재하지 않는다면) login화면으로 리다이렉트
app.get("/", (req, res) => {
  if (!req.user) return res.redirect("/login");
  fs.readFile("./webpage/main.html", (error, data) => {
      if (error) {
          console.log(error);
          return res.sendStatus(500);
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
  });
});

// google login 화면
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// google login 성공과 실패 리다이렉트
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
  })
);

// logout
app.get("/logout", (req, res) => {
  req.logout( () => {
    res.redirect("/login");
  });
});


server.listen(port, () => {
    console.log('Server is running on port:8000');
});