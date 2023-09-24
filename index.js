const express=require('express')
const cors=require('cors')
const app=express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const colors = require('colors')
// middleware 
app.use(express.json())
app.use(cors())


const tourRoute=require('./routes/tours/v1/tours.route')

app.use('/api/v1/tour', tourRoute)
app.get('/',(req,res)=>{
    res.send('tour management server is ready to run')
})

const database = process.env.DATABASE
const port = process.env.PORT || 6000
mongoose.connect(database, {
    useNewUrlParser: true,
    autoIndex: true,})
.then(() => {
    console.log('database connect success'.yellow.bold);
})
.catch((error=>{
    console.log(error.message);
}))

app.listen(port, () => {
    console.log(`server is running port ${port}`.red.bold);
})