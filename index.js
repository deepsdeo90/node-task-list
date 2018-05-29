/*
Created by:Dipali
Created On : 28/05/2017
*/
//fetch required modules 
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const asana   = require('asana');
const path    = require('path');
const app     = express();

//call api to display username
const client = asana.Client.create().useAccessToken(process.env.USER_ACCESS_TOKEN);
var username;
client.users.me()
  .then(function(me) {
    // Print out your information
    username = me.name;
});

//use express js for routing and ejs fo template
app.use(morgan('tiny'));
app.use(cors());
app.set("view engine","ejs");
app.use(express.static("public"));

//API call to asana to get my task
app.get("/asana/:id",(req,res)=>{
  let projectID=req.params.id;
  client.projects.findById(projectID)
    .then(data => {
        var projectname=  data.name;
        client.tasks.findByProject(projectID)
        .then(data => {
            //render to views/index.ejs
            res.render("index",{task:data.data, projectname:projectname,username:username,projectID:projectID});
        })
        .catch(err => {
          console.log(err)
        })

    })
    .catch(err => {
      console.log(err)
    })
});

//handle 404 page notfound error
function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Page Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.render("404",{message: error.message});
  
}

app.use(notFound);
app.use(errorHandler);

//connect to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});