let User = require('../models/User');
let List = require('../models/Todolist');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let  authenticateJWT = require('../midware/auth');
require('dotenv').config({ path: '../../.env' })

module.exports = (app) => {
   app.post("/api/user/register", async (req, res) => {
      try {
         let user = new User({
            name: req.body.name,
            email: req.body.email,
            role : req.body.role
         })
         user.password = await bcrypt.hashSync(req.body.password, 10);
         let createdUser = await User.create(user);
         let token = await jwt.sign({
            id:createdUser._id,
            role:createdUser.role
         }, process.env.TOCKEN_SECRET, {
            expiresIn: 604800
         })
         if (token) {
            return res.status(200).json({
               msg: "New user created",
               token: token,
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
         if(user){
            let match=await bcrypt.compare(password, user.password)
            if (user && match) {
               let token = await jwt.sign({
                  id:user._id,
                  role:user.role
               }, process.env.TOCKEN_SECRET, {
                  expiresIn: 604800
               })
   
               return res.status(200).json({
                  token: token,
               });
            } 
         }
         else {
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
      let reqid=req.userData.id;
      let id=req.params.id;
      if (id!=reqid) return res.status(500).json({
         msg: "You could only access your data"
      });
     
      User.findById(id,(error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.status(200).send(data.tags)
        }
      })
    })

    app.post("/api/user/:id/tags",authenticateJWT, async (req, res) => {
      let reqid=req.userData.user._id;
      let id=req.params.id;
      if (id!=reqid) return res.status(500).json({
         msg: "You could only access your data"
      });
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

    app.get("/api/user/:id/lists",authenticateJWT, async (req, res) => {
      let reqid=req.userData.id;
      let id=req.params.id;
      if (id!=reqid) return res.status(500).json({
         msg: "You could only access your data"
      });
      User.findById(id,(error, data) => {
        if (error) {
         return res.status(500).json({
            msg: "Something Went Wrong"
         })
        } else {
          return res.status(200).send(data.created)
        }
      })
    })
    
}

//todo:refresh jwt