let List = require('../models/Todolist');

module.exports = (app) => {
  app.get("/api/list", async (req, res) => {
    List.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.status(200).send(data)
      }
    })
  })

  app.get(`/api/list/:id`, async (req, res) => {
    // let page=req.params.page;
    // let posts = await Post.find().sort({"createDate":-1}).skip(page*5).limit(5);
    // return res.status(200).send(posts);
  });

  app.post(`/api/list`, async (req, res) => {
    let list = await List.create(req.body);
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
