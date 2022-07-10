const express = require('express')
const {MongoClient} = require('mongodb')
const {v4:uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const uri = 'mongodb+srv://Abhay:droplet@cluster0.ondz8.mongodb.net/?retryWrites=true&w=majority'


// we are calling express naming it app, to use app the features of express.
const app = express()

app.use(cors({origin:'*'}))
app.use(express.json())

const PORT = 5000
// using the method get, 
app.get('/', (req, res)=>{
    // .json() is helping to send the response to localhost:5000/
    res.json('hello!')
})

// this will be pos request as we sending/posting data to our database
app.post('/signup', async(req, res)=>{
    // res.json('sending data to database')
    // 
    const client = new MongoClient(uri)
    //console.log(req.body)
    // we made a post request in authmodal in client and took here to write in db.
    const {email, password} = req.body


//  for generating a unique id.
    const generatedId = uuidv4()
    // hashing the password
    const hashedpassword = await bcrypt.hash(password, 10)

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(409).send('user with this email already exist')
        } 

        const sanitizedEmail = email.toLowerCase()
        const data ={
            // lhs should be same modal as we wrote in our database
            user_id: generatedId,
            email: sanitizedEmail,
            password : hashedpassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {expiresIn:60*24})
        res.sendStatus(201).json({token, user_id:generatedId, email:sanitizedEmail})
    }
    catch(error){
        console.log(error)
    }
})

app.get('/users', async(req, res)=>{
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }
    finally{
        await client.close()
    }
})


//using the method listen to listen to the port
app.listen(PORT, ()=>console.log('Server running on PORT:'+ PORT))