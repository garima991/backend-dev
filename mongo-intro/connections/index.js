const mongoose = require("mongoose");

 
function startMongoDB(database_name){
    mongoose.connect(`mongodb://127.0.0.1:27017/${database_name}`).then(() => {
        console.log("Connected to MongoDB Successfully !");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    })    
}


module.exports = {startMongoDB};