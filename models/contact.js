const mongoose = require('mongoose');//importing the module

//Creating the contact schema i.e., what fields are there in each document of the collection.
const ContactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
});
//Now that we have defined a contact schema. Lets create a database with this contact schema.

const contact = mongoose.model('ContactListDB', ContactSchema);
//The 1st argument is the name of the database collection. We set it as ContactListDB and the 2nd argument is 
//contact schema of that collection.

//Finally we should export this collection model and use i.e., require this collection model in index.js
module.exports = Contact;