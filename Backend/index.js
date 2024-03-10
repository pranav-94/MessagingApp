require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const ranomd = require('../Backend')
const cors = require('cors')
const { userData, signUpData } = require('./db')
const app = express()

const port = process.env.PORT

const key = 'deadpool'

app.use(express.json())
app.use(cors())

app.post('/signUp',async(req,res)=>{
    const username = req.body.user 
    const password = req.body.password

   const signUpInfo =  await signUpData.create({
         username:username,
         password:password
    })
    res.send('done')
})

app.post('/LogIn',async(req,res)=>{
    const data = {
        username: req.body.loginUser, 
        password: req.body.loginPass
    }

   const verify = await signUpData.findOne({
        username: data.username,
        password: data.password
    })

    if(verify === null){
        return res.status(403).json({
            message:'user not found'
        })
    }

    res.status(201).json({
        message:`username ${verify.username} found`
    })
})

app.post('/sendMessage',async(req,res)=>{
    const username = req.body.username 
    const message = req.body.message 

    const date = new Date()
const hr = date.getHours()
const min = date.getMinutes()
const day = date.getDate()
const month = date.getMonth()+1
const year = date.getFullYear()
let time = (`${day}/${month}/${year}, ${hr}:${min}`)

console.log(time)

    const saveData = await userData.create({
        username: username,
        message: message,
        time:time
    })

    res.send(saveData)
})

app.get('/getMessages',async(req,res)=>{
   const getData = await userData.find()
   
   res.send(getData)
})

app.listen(port)
