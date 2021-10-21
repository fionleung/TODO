let List = require('../models/Todolist');
let  authenticateJWT = require('../midware/auth');
const user = require('../models/User');

module.exports = (app) => {
  app.get("/api/list",authenticateJWT,async (req, res) => {
    List.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.status(200).send(data)
      }
    })
  })

  app.get(`/api/list/:id`, async (req, res) => {
    let id=req.params.id;
    let lists = await List.find({_id:id});
    return res.status(200).send(lists);
  });

  app.post(`/api/list/listforuser`, async (req, res) => {
    let lists = await List.find({_id:{"$in":req.body}}).sort({$natural:-1});
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
    // const {id} = req.params;

    // let post = await Post.findByIdAndDelete(id);

    // return res.status(202).send({
    //   error: false,
    //   post
    // })

  })



}
