//front end
const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();

//varible for localhost 3000 
const base_url = "http://localhost:3000";

app.set("views",path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));



//show all taks
app.get("/",async (req ,res) => {
  try {
    const response = await axios.get(base_url + "/tasks");
    res.render("tasks", { tasks : response.data});

  } catch (err) {
    console.error(err);
    res.status(500).send("Error")
  }
});




app.get("/tasks/:task_id", async (req, res) => {
  try {
    const response = await axios.get(base_url +"/tasks/" + req.params.task_id);
    res.render("task" , { task: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("error")
  }
});

app.get("/create", (req ,res) => {
  res.render("create");
})

//link new task form back - end
app.post("/create", async (req,res) => {
  try{
    const data = {title: req.body.title , discription: req.body.discription, duedate: req.body.duedate, type_id: req.body.type_id};
    await axios.post(base_url + "/tasks", data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//link page taks in type from tasksintypes in backend
app.get("/taskontype/:type_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/tasksintypes/" + req.params.type_id);
    res.render("taskontype", {data: response.data});
  } catch(err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// link page edit or update form back-end
app.get("/update/:task_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/tasks/" + req.params.task_id);
    res.render("update", {task: response.data});
  } catch (err){
    console.error(err);
    res.status(500).send("Error");
  }
});

//here for you cant put update botton
app.post("/update/:task_id", async (req,res) => {
  try{
    const data = {title: req.body.title , discription: req.body.discription, duedate: req.body.duedate, type_id: req.body.type_id};
    await axios.put(base_url + "/tasks/" + req.params.task_id,data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//page to delete task ** Delete no more file .ejs
app.get("/delete/:task_id", async (req,res) => {
  try{
    const taskId = req.params.task_id;
    await axios.delete(base_url + "/tasks/" + taskId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//show all type
app.get('/types',async(req,res) => {
  try {
    const response = await axios.get(base_url + '/types');
    res.render("types" , {types: response.data});
  }catch (err) {
    console.error(err);
    res.status(500).send("Error")
  }
})

//page to create new types
app.get("/createTypes", (req,res) => {
  res.render("createTypes");
});

//link page create types form back end
app.post("/createTypes",async (req, res) => {
  try {
    const data = {category: req.body.category, total_task: 0};
    await axios.post(base_url+ "/types",data);
    res.redirect("/types");
  }catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});


app.get("/updateTypes/:type_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/types/" + req.params.type_id);
    res.render("updateTypes", {types: response.data});
  } catch (err){
    console.error(err);
    res.status(500).send("Error");
  }
});

//here for you cant put update botton
app.post("/updateTypes/:type_id", async (req,res) => {
  try{
    const data = { type_id: req.body.type_id,category: req.body.category};
    await axios.put(base_url + "/types/" + req.params.type_id,data);
    res.redirect("/types");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});


//delete type
app.get("/deleteTypes/:type_id", async (req,res) => {
  try{
    const typeID = req.params.type_id;
    await axios.delete(base_url + "/types/" + typeID);
    res.redirect("/types");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});


//show all user
app.get('/users',async(req,res) => {
  try {
    const response = await axios.get(base_url + '/users');
    res.render("users" , {users: response.data});
  }catch (err) {
    console.error(err);
    res.status(500).send("Error")
  }
})


//link page taks in task from usersontypes in backend
app.get("/usersontasks/:user_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/usersontasks/" + req.params.user_id);
    res.render("usersontasks", {data: response.data});
  } catch(err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

///////////////////////////////////////////////////////////////
// link page edit or update form back-end
app.get("/updateUser/:user_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/users/" + req.params.user_id);
    res.render("updateUser", {users: response.data});
  } catch (err){
    console.error(err);
    res.status(500).send("Error");
  }
});

//here for you cant put update botton
app.post("/updateUser/:user_id", async (req,res) => {
  try{
    const data = {username: req.body.username , email: req.body.email, password: req.body.password};
    await axios.put(base_url + "/users/" + req.params.user_id,data);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/createUser", (req ,res) => {
  res.render("createUser");
})

//link new user form back - end
app.post("/createUser", async (req,res) => {
  try{
    const data = {username: req.body.username , email: req.body.email, password: req.body.password};
    await axios.post(base_url + "/users", data);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//delete user
app.get("/deleteUser/:user_id", async (req,res) => {
  try{
    const UserID = req.params.user_id;
    await axios.delete(base_url + "/users/" + UserID);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error the Delete");
  }
});

////////////////ASSIGN//////////////////////////

app.get('/assignments',async(req,res) => {
  try {
    const response = await axios.get(base_url + '/assignments');
    res.render("assignments" , {assignments: response.data});
  }catch (err) {
    console.error(err);
    res.status(500).send("Error")
  }
})


app.get("/updateAssign/:assign_id", async (req,res) => {
  try {
    const response = await axios.get(base_url + "/assignments/" + req.params.assign_id);
    res.render("updateAssign", {assignments: response.data});
  } catch (err){
    console.error(err);
    res.status(500).send("Error");
  }
});

//here for you cant put update botton
app.post("/updateAssign/:assign_id", async (req, res) => {
  try {
    const data = { task_id: req.body.task_id, user_id: req.body.user_id };
    await axios.put(base_url + "/assignments/" + req.params.assign_id, data);
    res.redirect("/assignments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//delete assign
app.get("/deleteAssign/:assign_id", async (req,res) => {
  try{
    const asID = req.params.assign_id;
    await axios.delete(base_url + "/assignments/" + asID);
    res.redirect("/assignments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error the Delete");
  }
});


app.get("/createAssign", (req,res) => {
  res.render("createAssign");
});

//link page create types form back end
app.post("/createAssign",async (req, res) => {
  try {
    const data = {task_id: req.body.task_id, user_id: req.body.user_id};
    await axios.post(base_url+ "/assignments",data);
    res.redirect("/assignments");
  }catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(5500 , () => {
  console.log("Server started on port 5500");
});