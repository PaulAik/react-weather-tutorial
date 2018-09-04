var express = require("express");
var router = express.Router();
var NodeGeocoder = require("node-geocoder");

var options = {
  provider: "openstreetmap",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  //apiKey: process.env.GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

router.get("/", function(req, res, next) {
  var geocoder = NodeGeocoder(options);

  res.setHeader("Content-Type", "application/json");

  // Or using Promise
  var query = req.query.query;
  console.log(query);

  geocoder
    .geocode(query)
    .then(function(geores) {
      res.send(JSON.stringify(geores[0]));
    })
    .catch(function(geoerr) {
      res.send(JSON.stringify(geoerr));
    });
});

module.exports = router;
