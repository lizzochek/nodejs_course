const request = require("request");

const url =
  "http://api.weatherstack.com/current?access_key=6796f824b09717014ea7e2f511b88e69&query=37.8267,-122.4233";
request(
  {
    url: url,
    json: true,
  },
  (error, response) => {
    //Response body already comes parsed
    //using the parameter in the first argument
    //of the function
    const data = response.body.current;
    console.log(
      `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees`
    );
  }
);
