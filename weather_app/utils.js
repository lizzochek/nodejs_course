const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibGl6em9jaGVrIiwiYSI6ImNrcHNsNXdhYTBha3Iybm5vdjJ4YmgxbmUifQ.va8Aq6IDHO-ucrq2mmfjpw&limit=1`;

  request(
    {
      url: url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          placeName: response.body.features[0].place_name,
          lat: response.body.features[0].center[1],
          lng: response.body.features[0].center[0],
        });
      }
    }
  );
};

const weather = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6796f824b09717014ea7e2f511b88e69&query=${lat},${lng}`;
  request(
    {
      url: url,
      json: true,
    },
    (error, response) => {
      //Response body already comes parsed
      //using the parameter in the first argument
      //of the function

      if (error) {
        callback("Unable to connect to weather services", undefined);
      } else if (response.body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, response.body.current);
      }
    }
  );
};

module.exports = {
  geocode,
  weather,
};
