var express = require("express");
var fetch = require("node-fetch");
var router = express.Router();

router.get("/", function(req, res, next) {
  var darkskyApiKey = "your-api-key-here";

  fetch(
    `https://api.darksky.net/forecast/${darkskyApiKey}/${req.query.latitude},${
      req.query.longitude
    }/?exclude=minutely,hourly&units=uk2`
  )
    .then(function(fetchRes) {
      return fetchRes.json();
    })
    .then(function(json) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(json));
    })
    .catch(function(error) {
      res.send(JSON.stringify(error));
    });
});

module.exports = router;
