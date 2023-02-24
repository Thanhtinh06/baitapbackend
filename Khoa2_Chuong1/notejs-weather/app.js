//import library (ES5)
const asyncrequest = require("async-request");

const getWeather = async (location) => {
    const access_key = "0b60ba963a54cf39eadc0e8e4dc89502"
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
    try {
        const res = await asyncrequest(url);
        const data = JSON.parse(res.body);
        const weather = {
            isSuccess : true,
            region : data.location.region,
            country : data.location.country,
            temperature : data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover : data.current.cloudcover
        };
        console.log(weather)
        return weather
    } catch (error) {
        return {
            isSuccess : false,
            error
        }
    }
}

//http://localhost:3000/

// getWeather("tokyo");
const express = require("express");
const app = express();
const path = require("path");

//set static file (public)
const pathPublic = path.join(__dirname,"./public");
app.use(express.static(pathPublic));

app.set("view engine","hbs"); //pug => công nghệ render server side render

app.get("/", async (request, respone) => {
    const params =  request.query;
    const location = params.address;
    const weather = await getWeather(location);
    if(location){
        respone.render('weather',{
            status: true,
            region : weather.region,
            country: weather.country,
            temperature : weather.temperature,
            wind_speed : weather.wind_speed,
            precip : weather.precip,
            cloudcover : weather.cloudcover
        })
    }else{
        respone.render('weather'),{
            status:false
        }
    }

})

const port = 3000;
app.listen(port, () => {
    console.log(`app run on port http://localhost:${port}`);
})