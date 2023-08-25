// Require .env so it can read and use it
require('dotenv').config()

// Express Import
const express = require('express');
const app = express();
const port = 4000; 

// Mongoose Import
const mongoose = require('mongoose');

//Import routes
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/user')


app.use(express.json()) ;// looks for body in the request, will parse it and attaches it to req object

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//Attach Routes to the app
app.use('/api/projects/', projectRoutes)

app.use('/api/users/', userRoutes)

// Bring in username and password from the .env file
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

// Mongo connection string
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.4dudi8a.mongodb.net/?retryWrites=true&w=majority`

// Sets up what will be shown in the browser
// Define a simple route for home or root 
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!'); 
  // message shown when we navigate to this URL
  });

// Gets the local host to work :)
app.listen(port, ()=>{
    console.log(`Express server is running on http://localhost:${port}`)
})

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err);
    });