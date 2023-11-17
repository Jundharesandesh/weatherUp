
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require ("http")






app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  const temp="hhh";





});
app.post("/", (req, res) => {

  res.sendFile(__dirname + "/index.html");
});



app.post("/temp", (req, res) => {
   const city =req.body.san
  const url="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=38491c12873781552db80e992e8ab24c&units=metric"

  http.get(url, (responce) => {

    responce.on("data",function(data){
     const wdata = JSON.parse(data);
     const max = wdata.main.temp_max
     const icon = wdata.weather[0].icon
     const min = wdata.main.temp_min
     const hum=wdata.main.humidity
     const main = wdata.weather[0].main
     const lat=wdata.coord.lon
     const long=wdata.coord.lat
     const rise1=wdata.sys.sunrise
     const se1=wdata.sys.sunset


     let now= new Date(se1*1000);
     const se = now.getHours()+":"+now.getMinutes();
     let now1= new Date(rise1*1000);
     const rise = now1.getHours()+":"+now1.getMinutes();

     const f11=((max * 9/5) + 32);
     const f1=Math.round((f11 + Number.EPSILON) * 100) / 100;

      const f22=((min * 9/5) + 32);
      const f2=Math.round((f22 + Number.EPSILON) * 100) / 100;


      const date=now.getDate()+"/"+now.getDay()+"/"+now .getFullYear();



     const url =" src=https://openweathermap.org/img/wn/"+icon+"@2x.png ";


     const speed= wdata.wind.speed

             res.render("index",{MAXi:max,city:city,MINi:min,speed:speed,icon:url,hum:hum,main:main,long:long,lat:lat,se:se,rise:rise,f1:f1,f2:f2,date:date})
             console.log(rise)
    })
  });

});



app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
