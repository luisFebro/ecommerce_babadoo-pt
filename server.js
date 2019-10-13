const express = require('express');
const path = require('path');
// Database MongoDB
const mongoose = require('mongoose');
const { mongoUrl } = require('./config/keys.js');
// End Database MongoDB

//Init Express
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Database config
const db = mongoUrl

//  Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true //Applied after DeprecationWarning and goal: new Server Discover and Monitoring engine
  })
  // // Rename the default `test` collection in the database
  // .then(() => db.copyDatabase("mern-shopping-list","babadoo"))
  // .then(() => console.log("collection renamed successfully!"))
  // .catch(e => console.log("rename failed:", e.message))
  // End Rename the default `test` collection in the database
  .then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.log(err));
// End Database config

// Use Routes
app.use('/api/form', require('./routes/api/emailPurchaseRequest'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));
// End Use Routes

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
})
// End

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});