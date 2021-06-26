const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibGl6em9jaGVrIiwiYSI6ImNrcHNsNXdhYTBha3Iybm5vdjJ4YmgxbmUifQ.va8Aq6IDHO-ucrq2mmfjpw&limit=1`;

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        const { place_name: placeName, center } = body.features[0];
        callback(undefined, {
          placeName,
          lat: center[1],
          lng: center[0],
        });
      }
    }
  );
};

const weather = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6796f824b09717014ea7e2f511b88e69&query=${lat},${lng}`;
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      //Response body already comes parsed
      //using the parameter in the first argument
      //of the function

      if (error) {
        callback("Unable to connect to weather services", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, body.current);
      }
    }
  );
};

module.exports = {
  geocode,
  weather,
};
