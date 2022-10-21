const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs"); // for using partials
require("../src/db/conn");
const Register = require("../src/models/registers");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(express.static("views"));
app.engine("html", require("hbs").__express);
app.set("views", "views");
app.set("view engine", "hbs");
app.set("views", template_path); // templates m hai views
hbs.registerPartials(partials_path);
console.log(path.join(template_path));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/register", async (req, res) => {
  try {
    // const user = new Register(req.body);
    // const createUser = await user.save();
    // res.status(201).send(createUser);
    // console.log(req.body.fullname);
    // console.log(req.body.email);
    // console.log(req.body.passward);
    // console.log(req.body.passwordrepeat);
    // res.send(req.body.fullname);
    // res.send(req.body.email);
    // res.send(req.body.passward);
    // res.send(req.body.passwordrepeat);
    const passward = req.body.passward;
    const confirmpassward = req.body.passwordrepeat;
    if (passward === confirmpassward) {
      const registerEmployee = new Register({
        fullname: req.body.fullname,
        email: req.body.email,
        passward: passward,
        // confirmpassward: req.body.passwordrepeat
        confirmpassward: confirmpassward,
        // mene sara data get ke liya hai
      });
      // ab data database me store krna hai
      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("passward are not  matching");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const passward = req.body.passward;
    const useremail = await Register.findOne({ email: email });
    // res.send(useremail.passward);
    // console.log(useremail);
    if(useremail.passward === passward){
      res.status(201).render("index");
    }
    else{
      res.send("invalid login details");
    } 
  } catch (e) {
    res.status(400).send("invalid login details");
  }
});
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
