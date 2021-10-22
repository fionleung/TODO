let List = require('../models/Todolist');
let  authenticateJWT = require('../midware/auth');
const user = require('../models/User');

module.exports = (app) => {
  

  app.get(`/api/list/:id`,authenticateJWT,async (req, res) => {
    let id=req.params.id;
    List.findById(id,(error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.status(200).send(data)
      }
    })
  });

  app.put(`/api/list/:id`,authenticateJWT,async (req, res) => {
    let reqid = req.userData.user._id;
    let userid = req.body.creator;
    if (userid!=reqid) return res.status(500).json({
      msg: "You could only access your data"
   });
    let id=req.params.id;
    let lists = await List.findByIdAndUpdate({_id:id},req.body);
    return res.status(200).send(lists);
  });

  app.post(`/api/list/listforuser`,authenticateJWT, async (req, res) => {
    let reqid=req.userData.user._id;
    let lists = await List.find({_id:{"$in":req.body},creater:reqid},'title tasksnum taskdone tags').sort({$natural:-1});
    return res.status(200).send(lists);
  });
  
  app.post(`/api/list`, authenticateJWT, async (req, res) => {
    let userid = req.body.creator;
    let list = await List.create(req.body);
     user.findByIdAndUpdate(
      userid,
      {$push: {"created": list._id}},
      { returnNewDocument: false },
      function(err, model) {
          console.log(err);
      }
  );
   
    return res.status(201).send({
      error: false,
      list
    })
  })

  
  app.put(`/api/list/:id`, async (req, res) => {
    // let post = await Post.findByIdAndUpdate(id, req.body);
    // return res.status(202).send({
    //   error: false,
    //   post
    // })

  });

  app.delete(`/api/list/:id`, async (req, res) => {
    const {id} = req.params;
   console.log("deleted");
    let list = await List.findByIdAndDelete(id);
    user.findByIdAndUpdate(
      list.creator,
      {$pull: {"created": list._id}},
      { returnNewDocument: false },
      function(err, model) {
          console.log(err);
      }
  );
    return res.status(201).send({
      error: false,
      list
    })

  })



}
