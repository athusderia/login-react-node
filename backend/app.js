const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');



// require('dotenv').config();
dotenv.config();
// console.log('[' + process.env.DB_CONNECTION_STRING + ']');

console.log("DB_CONNECTION_STRING =", process.env.DB_CONNECTION_STRING);


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to mongodb");
}

main().catch(console.error);

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', require('./routes/user'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/signout'));

app.get("/", (req,res)=>{
    res.send("Hola mundo")
});

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})