const express  = require("express")
const app = express();
const path = require("path")
const port = process.env.PORT ||3000;
require("../src/db/conn")
const static_path = path.join(__dirname,"../public")
app.use(express.static(static_path))
// console.log(path.join(__dirname));
app.get("/",(req,res)=>{
    res.send("hello from the dark side!")
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})