const axios = require('axios')


/* Usually would store in a hidden env variable but due to nature of project, i will leep it public */
const token = 'bWFuZ286bTNzc3lSYW04Ng=='


async function addUserToTalcast(fname,lname,email){

    try {
        let response = await axios.post(`https://tallen.webcasts.com/viewer/regserver.jsp?ei=1397572&tp_key=7ce28285e0&fname=${fname}&lname=${lname}&email=${email}&pass=tall001`)
        return response;
    } catch (error) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
    }
  
}

async function addUserToCollaborate(body){

    console.log(`in function : ${body}`)

    try {
        let response =  await axios.put('https://collaborate.tallen-inc.com/api/2/mango/user_invitee', body, {
            headers : {
                'Authorization': `Basic ${token}`,
                "Content-Type": "application/json"
            }
        })
        console.log(response)
        return response;
    } catch (error) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
    }
  
}

module.exports.addUserToCollaborate = addUserToCollaborate
module.exports.addUserToTalcast = addUserToTalcast