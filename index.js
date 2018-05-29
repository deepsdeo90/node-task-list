const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const asana = require('asana');
const client = asana.Client.create().useAccessToken(process.env.USER_ACCESS_TOKEN);
var username;
client.users.me()
  .then(function(me) {
    // Print out your information
    username = me.name;
   // console.log('Hello world! ' + 'My name is ' + me.name + ' and my primary Asana workspace is .');
});

const app = express();
const path = require('path');

app.use(morgan('tiny'));
app.use(cors());
app.set("view engine","ejs");

app.use(express.static("public"));


app.get("/asana/:id",(req,res)=>{
	let projectID=req.params.id;
	client.projects.findById(projectID)
    .then(data => {
      	var projectname=  data.name;
       	client.tasks.findByProject(projectID)
		    .then(data => {
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


function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});