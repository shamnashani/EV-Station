const mongo = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db = async () => {
    await mongo.connect("mongodb+srv://shamnashani5627_db_user:shamnadbshani@cluster0.84fetjy.mongodb.net/ev_project?retryWrites=true&w=majority");
    
    console.log("connected");
}

module.exports = db