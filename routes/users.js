var express = require("express");
const Model_Users = require("../model/Model_Users");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let data = await Model_Users.getId(id);
    if (data.length > 0) {
      if (data[0].level_users != 'users') {
        res.redirect("/logout");
      } else {
        res.render("users/index", {
          title: "Users Home",
          email: data[0].email,
        });
      }
      // Akhir kondisi
    } else {
      res.status(401).json({ error: "user tidak ada" });
    }
  } catch (error) {
    res.status(501).json("Butuh akses login");
  }
});

module.exports = router;