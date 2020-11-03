

submit = document.getElementById('submit')
fname = document.getElementById('first-name')
lname = document.getElementById('last-name')

let firstName;
let lastName;


submit.addEventListener('click', () =>{
    firstName 
   console.log(`First name: ${fname.value} Last name: ${lname.value}  `)
})

fname.addEventListener('change', () =>{
    firstName = fname.value
    console.log(firstName)
})

lname.addEventListener('change', () =>{
    lastName = lname.value
    console.log(lastName)
})