let User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let  authenticateJWT = require('../midware/auth');
require('dotenv').config({ path: '../../.env' })

module.exports = (app) => {
   app.post("/api/user/register", async (req, res) => {
      try {
         let user = new User({
            name: req.body.name,
            email: req.body.email
         })
         user.password = await bcrypt.hashSync(req.body.password, 10);
         let createdUser = await User.create(user);
         let token = await jwt.sign({
            user
         }, process.env.TOCKEN_SECRET, {
            expiresIn: 604800
         })
         if (token) {
            return res.status(200).json({
               msg: "New user created",
               token: token,
               userCredentials: createdUser
            })
         }
      } catch (err) {
         console.log(err)
         return res.status(500).json({
            error: err
         })
      }
   })

   app.post("/api/user/login", async (req, res) => {
      const { email, password } = req.body;
      try {
         const user = await User.findOne({ email: email});
         let match=await bcrypt.compare(password, user.password)
         if (user && match) {
            let token = await jwt.sign({
               user
            }, process.env.TOCKEN_SECRET, {
               expiresIn: 604800
            })
            console.log("token created");
            return res.status(200).json({
               token: token,
               userCredentials: user
            });
         } else {
            return res.status(400).send({ msg: 'Username or password incorrect' });
         }
      } catch (err) {
         console.log(err)
         return res.status(500).json({
            msg: "Something Went Wrong"
         })
      }
   })

   app.get("/api/user/:id/tags",authenticateJWT, async (req, res) => {
      let id=req.params.id;
      User.findById(id,(error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.status(200).send(data.tags)
        }
      })
    })

    app.post("/api/user/:id/tags",authenticateJWT, async (req, res) => {
      let id=req.params.id;
      User.findByIdAndUpdate(
         id,
         {tags: req.body},
         function (err, docs) {
            if (err){
                console.log(err)
            }
         }
     );
    })
}

//todo:refresh jwt