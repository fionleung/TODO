require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
 
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@todo.6ccrv.mongodb.net/TodoDB",{
    useNewUrlParser: true, 
    useUnifiedTopology: true
 }).then(() => {
       console.log('Database sucessfully connected')
    },
    error => {
       console.log('Database could not connected: ' + error)
    }
 )
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require('./server/routes/listRoutes')(app);
require('./server/routes/userRoutes')(app);


// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
//const distDir = __dirname + "/dist/";
//app.use(express.static(distDir));
// app.use(express.static(path.join(__dirname, 'dist/')));
// app.use('/', express.static(path.join(__dirname, 'dist/')));
// app.use('/api', listRoute)
  
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
