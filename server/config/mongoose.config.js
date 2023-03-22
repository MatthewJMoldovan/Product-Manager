const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;




mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Successfully Connected to Database!"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));