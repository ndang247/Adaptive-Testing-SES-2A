const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoToken'); //config folder for global tokens

// @desc Function to connect to mongo using token

const connectDB = async() =>{
    try {
        await mongoose.connect(db, { //asynchronously connect to db
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });   
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;