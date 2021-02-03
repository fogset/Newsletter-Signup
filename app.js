const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const conFig = require('./config');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email= req.body.email;
  const data ={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_field:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/" + conFig.audienceKey;
  const options ={
    method: "POST",
    auth: "tian:" + conFig.apiKey
  };
  const request = https.request(url,options,function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
