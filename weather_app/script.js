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

const geocodeUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGl6em9jaGVrIiwiYSI6ImNrcHNsNXdhYTBha3Iybm5vdjJ4YmgxbmUifQ.va8Aq6IDHO-ucrq2mmfjpw&limit=1";

request(
  {
    url: geocodeUrl,
    json: true,
  },
  (error, response) => {
    const center = response.body.features[0].center;
    const placeName = response.body.features[0].place_name;
    const lat = center[1];
    const lng = center[0];

    console.log(`Coordinates of ${placeName} are: ${lat}, ${lng}`);
  }
);
