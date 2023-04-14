const express = require('express')
const app = express()
app.use(express.json());
const product_router=require("./routes/ProductRout")
const user_router=require("./routes/UserRout")
const category_router=require("./routes/CategoryRout")
let bodyParser = require('body-parser') 
let cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use("/prod",product_router)
app.use("/user",user_router)
app.use("/cat",category_router)



app.listen(5000)