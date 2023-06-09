const { generateAccessToken } = require('../jwt/jwt_generate');
const {Users} = require ('../models')
const bcrypt = require("bcrypt");

async function user_register(req, res){
    const {email, password}=req.body
    if (!email || !password) {
    return res.status(400).json({ error: "Please provide all required fields." })
  }

  // Check if a user with the provided email already exists
  const existingUser = await Users.findOne({ where: { email: email } })
  if (existingUser) {
    return res.status(409).json({ error: "A user with this email already exists." })
  }
    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(password, salt)
    if (email !=="" &&  password!=="") {
    Users.create({email, password:hashed_password})
    .then((data)=>{
           res.status(201).json(data)
        })
    .catch((err)=>{
            res.status(500).json({error:err.message})
        })
      }else {
      
      res.json({
        err: "table is empty"
      })
      }
}

async function user_login(req, res) {
    const {email, password} = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("Email is not correct");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = generateAccessToken(email, user.id,user.role);
      res.send(JSON.stringify({ status: "Logged in", jwt: token, user}));
    } else {
      return res.status(400).send("Invalid password");
    }
  }
   


module.exports = {user_register,user_login}