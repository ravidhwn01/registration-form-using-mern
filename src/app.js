const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");  // for using partials
require("../src/db/conn");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.use(express.static('views'));
app.engine('html', require('hbs').__express);
app.set('views', 'views');
app.set('view engine', 'hbs');
app.set("views", template_path); // templates m hai views
hbs.registerPartials(partials_path);
console.log(path.join(template_path));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
