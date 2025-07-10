const express = require('express')
const cookie_parser = require('cookie-parser')
const db = require('./db.js')
const { PORT } = require('./config')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express()


app.use(express.json())
app.use(cookie_parser())

db.databaseConnect()

//Routes
app.use('/api',authRoutes)
app.use('/api',userRoutes)



app.listen(PORT,()=>
{
    console.log(`server is running at ${PORT}`)
})

