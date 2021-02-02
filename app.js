const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email= req.body.email;
  var data ={
    members:[
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  }
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})

//API Key
//7ab3fd7a5144327dc7410630346661f9-us7
//Audience id 66c53ff11c
