const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");

const app = express();
const bodyParser = require('body-parser');
const { createServer } = require("http");
const server = createServer(app);
const port = 8000;
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const uri = "mongodb+srv://admin:admin12345@cluster0.pzm0h.mongodb.net/todoGenie?retryWrites=true&w=majority";
const GOOGLE_CLIENT_ID = "465272069084-thehp3rgl4ji68pf4m65l7d2bbrcn34j.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todos"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


server.listen(port, () => {
    console.log('Server is running on port:8000');
});