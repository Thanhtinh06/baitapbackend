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

getWeather("tokyo");