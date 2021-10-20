let User= require('../models/User');

module.exports = (app) =>{
   app.post("/api/user/register", async (req, res) => {
      try {
          let user = new User({
              name: req.body.name,
              email: req.body.email
          })
          user.password = await user.hashPassword(req.body.password);
          let createdUser = await User.create(user);
          return res.status(200).json({
              msg: "New user created",
              data: createdUser
          })
      } catch (err) {
          console.log(err)
          return res.status(500).json({
              error: err
          })
      }
  }
   )}

