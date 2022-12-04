const router = require("express").Router();
const User = require("../models/user");
const crypto = require('crypto');
const cors = require('cors');
router.use(cors());

// router.get('/sign_up', function(req, res, next) {
//   res.render("signup");
// });

router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.random() + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  // User.findExisting(body.userId))
  // console.log("hello");

  User.create({
    userName: body.userName,
    userId: body.userId,
    password: hashPassword,
    salt: salt
  })
  .then( user => {
    res.send(user);
  })
  .catch( err => {
    console.log(err)
  })
})

// 메인 페이지
router.get('/', function(req, res, next) {
  if(req.cookies) {
    console.log(req.cookies);
  } else {
    console.log("no cookies");
  }

  res.send('환영합니다~');
});

// 로그인 GET
router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render("login", {
    session : session
  });
});

// 로그인 POST
router.post("/login", async function(req, res, next){
  let body = req.body;
  console.log(body);

  let result = await User.findOne({
      userId : body.userId
  });

  if(result) {
    let dbPassword = result.password;
    let inputPassword = body.password;
    let salt = result.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  
    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");
  
        req.session.userId = body.userId;  
    } else{
        console.log("비밀번호 불일치");
    }
  } else {
    console.log("존재하지 않는 아이디");
  }
  res.redirect("/users/login");
});

// 로그아웃
router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/users/login")
})

module.exports = router;