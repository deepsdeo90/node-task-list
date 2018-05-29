## Description

A simple interface to display list of Asana task. Demo lists project name and all tasks within that project. Each task is linked to app.asana.com. Added button to hide task from list. API request is made with nodejs and ejs is used for html templating. User interactions are a handled with vanillajs.

## Set Env Varible

Set environment variable USER_ACCESS_TOKEN in order for the app to connect.

## How to run on local sever

Run `node index.js` for a local server. Navigate to `http://localhost:5000/asana/560078760885135`. Set  environment variable USER_ACCESS_TOKEN in order for the app to connect to your account. Supply the project ID via host:port/asana/projectid
to view task from your accout.

## Demo URL

https://node-task-list.herokuapp.com/asana/687875224176902

