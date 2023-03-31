const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;
mongoose.set('strictQuery');

mongoose.connect(url)
.then(()=>{
    console.log('Connection established');
}).catch(err => {
    console.log('An error occured in connection');
    console.log(err);
});

// now create a schema
const phoneSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
});

phoneSchema.set('toJSON',{
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id.toString,
        delete returnedDocument._id;
        delete returnedDocument.__v;
    }
})

// Now export the schema
module.exports = mongoose.model('phonebook', phoneSchema);