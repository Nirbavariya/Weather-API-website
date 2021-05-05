const express = require("express");
const https = require('https');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function (req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function (req,res) {
   // console.log(req.body.city);
    //console.log("Post request received. ");
      const query = req.body.city;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=b26939904914ae2b7c844c1dd2187e7b";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data",function (data) {
            //const weatherData = data in hexadecimal format
            //console.log(data);
            //in json i.e js object format
            const weatherData = JSON.parse(data);
            
            //console.log(weatherData);
            const temp = weatherData.main.temp 
            console.log(temp)
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            console.log(description)
           // console.log(JSON.stringify(data))
           res.write("<p>The weather description is : " + description + "</p>");
           res.write("<h1>The temp of " + query + " is " + temp +" degree celsius.</h1>");
           res.write("<img src=" + imageUrl + "></img>");
           res.send();
        })
    })
   // res.send("Server is up and running.");
})




app.listen(3000,function () {
    console.log("Server is running on port 3000");
})
