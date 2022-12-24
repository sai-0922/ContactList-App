const express = require('express');
const path = require('path')
const port = 3000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

//The below two lines will setup the engine.
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));//So whenever we use a reference to view file(i.e., .ejs file) it looks up
//in the location/path specified i.e., dir../views. Note that 1st arg 'views' is a keyword and the other 'views' arg is foldername. 


/*app.get('/', function(req, res){
    //console.log(__dirname);prints the directory name from which the server/index.js is started.
    res.send('Your first express server..')
})

app.get('/bold', function(req, res){
    //console.log(req); If u want to know about each request sent.
    res.send('<h1>Your first express server in bold.</h1>')
})*/

//Contacts Array
contactList = [
    {
        name : "Jess",
        number : "8983212345"
    },
    {
        name : "Stone",
        number : "0110232323"
    },
    {
        name : "Rach",
        number : "9330494322"
    }
]

//Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded());

//Inbuilt middleware for accessing static files
app.use(express.static('assets'));

//MIDDLEWARES
app.use(function(req, res, next){
    req.myName = "Che guevara";//We are trying to add a new key-val pair to the request object.
    console.log("Middleware 1 called!");
    next();
})

app.use(function(req, res, next){
    console.log(req.myName);//Accessing the element added in middleware1. We can even access this name in controller i.e., any of the .get and .post requests.
    console.log("Middleware 2 called!")
    next();
})

//The other possible practice is using the view engine. We just need to specify the filename u want to render.
app.get('/', function(req, res){
    //return res.render('home', { title: "My Contacts List" , contact_list: contactList});//It is prefered to use return statement if no further execution required.
    //The above line is for temporary storage. Lets now use databases to store and access data.

    //The 1st arg is query. Here nothing mentioned so all contacts are selected. If we mention {name : 'Mark'} then all contacts with name 'Mark' are selected.
    //The 2nd arg of function inside is the collection satisfying that query.
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from database.');
            return;
        }
        return res.render('home', { title: "My Contacts List" , contact_list: contacts});
    })
})

app.get('/practice', function(req, res){
    return res.render('practice', {title:"Practice ejs"});
})

app.post('/new-contact', function(req, res){
    console.log(req.body);
    //Next step is to push the contact into contactList
    /*contactList.push(
        {
            name: req.body.name,
            number: req.body.number
        }
    )*/
    //But note that this is not permanent storage once the server is off the data erases.


    //Creating contact in db
    Contact.create({
        name : req.body.name,
        number : req.body.number
    }, function(err, newContact){//The 2nd argument is the contact just created.newContact is just a var name.
        if(err){console.log('Error in creating contact!');return;}

        console.log('*********', newContact);

        return res.redirect('back');//To redirect the page after form is submitted
    })

})

app.get('/delete-contact/:id', function(req, res){
    //We used params to do this. Instead we can also use query params.
    let id = req.params.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting contact');
        }
    })
    //let ContactIndex = contactList.findIndex(contact => contact.name == name);

    /*if(ContactIndex != -1){
        contactList.splice(ContactIndex, 1);
    }*/

    return res.redirect('back');
})


app.listen(port, function(err){
    if(err){
        console.log('There is a problem running the server!');
    }
    console.log('Yo! the server is up and running..')
})