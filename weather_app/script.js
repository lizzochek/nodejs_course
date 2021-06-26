const request = require("request");
const { geocode, weather } = require("./utils.js");

const city = process.argv[2];
if (!city) return console.log("Please provide a place!");

geocode(city, (error, { placeName: location, lat, lng }) => {
  if (error) return console.log(error);

  weather(lat, lng, (error, data) => {
    if (error) return console.log(error);

    console.log(
      `Weather for ${location}:\n${data.weather_descriptions[0]}.\nIt is currently ${data.temperature} degrees out.\nIt feels like ${data.feelslike} degrees`
    );
  });
});
