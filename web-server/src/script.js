const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode, weather } = require("./utils.js");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Liza Dolgova",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Liza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Here you can get help",
    title: "Help",
    name: "Liza Dolgova",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { lat, lng, location } = {}) => {
    if (error) return res.send({ error });
    weather(lat, lng, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

//Request into the callback has information about the query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Liza Dolgova",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Liza Dolgova",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
