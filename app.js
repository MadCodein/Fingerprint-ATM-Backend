const express = require('express')
const bcrypt = require('bcryptjs')

const app = express()

app.use(express.json())
 app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 4000
const accounts = require("./accounts.json")
const { json } = require('express')


app.get("/",(req,res)=>{
    return res.json(accounts)
})

// const saltRounds = 10;
// var hashed = ""
// const myPlaintextPassword = "5155";
// const someOtherPlaintextPassword = "password";

// bcrypt.hash(myPlaintextPassword, saltRounds,(err,hash)=>{
//     hashed = hash;
//     console.log("Hash of pin: "+hashed);
// })

app.get("/validatePin", (req,res)=>{
return res.send(`<form method="POST" action="/validatePin">
                  Account Number: <input required type="text" name="AccountNo"/>
                  Validate Pin: <input required type="text" name="Pin"/>
                  <input type="submit"/>
                </form>`)
            })
            
app.post('/validatePin', async(req,res)=>{
var accountNo = req.body.AccountNo
var jsonAccountNo = accounts.userAccounts

    for (var i in accounts.userAccounts){
        if(parseInt(accountNo) === parseInt(jsonAccountNo[i].accountNo)){
            await bcrypt.compare(req.body.Pin, jsonAccountNo[i].pin,(err,response)=>{
                return res.send("Pin validity is " + response);
            })
        }
    }

})

app.listen(port,()=>{
    console.log("Server running on port: " + port)
})