var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var Model_Users = require("../model/Model_Users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("auth/register");
});

router.get("/login", function (req, res, next) {
  res.render("auth/login");
});

router.post("/saveusers", async (req, res) => {
  let { username,email, password, level_users } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let Data = {
    username,
    email,
    password: enkripsi,
    level_users: 'users',
  };
  await Model_Users.Store(Data);
  req.flash("success", "Berhasil Login");
  res.redirect("/login");
});

router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  try {
    let Data = await Model_Users.Login(email);
    if (Data.length > 0) {
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data[0].id_users;
        req.session.userRole = Data[0].level_users; // Store role in session
        req.session.userEmail = Data[0].email; // Store email in session
        const role = Data[0].level_users;
        if (role === 'superadmin') {
          res.redirect("/superadmin");
        } else if (role === 'admin') {
          res.redirect("/admin");
        } else if (role === 'users') {
          res.redirect("/users");
        } else {
          req.flash("error", "Role pengguna tidak dikenal");
          res.status(404).render('rekon/404');
        }
      } else {
        req.flash("error", "Email atau password salah");
        res.status(404).render('rekon/404');
      }
    } else {
      req.flash("error", "Akun tidak ditemukan");
      res.status(404).render('rekon/404');
    }
  } catch (err) {
    req.flash("error", "Error pada fungsi");
    res.status(404).render('rekon/404');
  }
});


router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;