const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars")
const axios = require('axios')
const { response } = require('express')


const app = express()

const PORT = process.env.PORT || 5000


// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req,res) =>{
    res.render('index')
})

app.get('/webcast', (req,res) =>{
    let fname = req.query.fname;
    let lname = req.query.lname;
    let email = req.query.email;

  
   /* register user with form data */
    try {
        axios.post(`https://tallen.webcasts.com/viewer/regserver.jsp?ei=1397572&tp_key=7ce28285e0&fname=${fname}&lname=${lname}&email=${email}&pass=tall001`)
        console.log(response)
    } catch (error) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
    }


    let url = `https://tallen.webcasts.com/starthere.jsp?ei=1397572&tp_key=b680f9423e&fname=${fname}&lname=${lname}&email=${email}&pass=tall001`
    res.render('webcast', {
        fname: fname,
        lname: lname,
        email: email,
        url: url
    
    })
})





app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})