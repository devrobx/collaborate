const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars")
const {addUserToTalcast} = require('./helper')
const {addUserToCollaborate} = require('./helper')


const app = express()

const PORT = process.env.PORT || 5000
const eventid = 1134


// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))


/* ROUTES */
app.get('/', (req,res) =>{
    res.render('index')
})

app.get('/webcast', (req,res) =>{

    let fname = req.query.fname;
    let lname = req.query.lname;
    let email = req.query.email;
    let collaborateUrl;
    let resultBody;

    let reqBody = `input_type=json&rest_data={
        "session_id":${eventid},
        "email":"${email}",
        "first_name":"${fname}", 
        "last_name":"${lname}",
        "send_email_invitation":false,
        "role":2
      }`
    
    Promise.all([addUserToTalcast(fname,lname,email), addUserToCollaborate(reqBody) ])
    .then(function(result) {
       
        console.log(result)
        resultBody = result
        collaborateUrl = resultBody[1].data.personal_session_link
        let talcastUrl = `https://tallen.webcasts.com/starthere.jsp?ei=1397572&tp_key=b680f9423e&fname=${fname}&lname=${lname}&email=${email}&pass=tall001`

        res.render('webcast', {
        fname: fname,
        lname: lname,
        email: email,
        url: talcastUrl,
        url2: collaborateUrl
    
         })

    })

    
})





app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})