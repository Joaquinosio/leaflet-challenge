// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Load in GeoJson data
// var geoData = "static/data/all_week.geojson";
// var geojson;

function chooseColor(magnitude) {
  switch (true) {
  case magnitude >4.5:
    return "red";
  case magnitude >2.5:
    return "orange";
  case magnitude >1:
    return "yellow";
  case magnitude >0:
    return "green";
  }
}


// Grab data with d3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  // console.log(data)
  // Create a new choropleth layer
  geojson = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
  },
    style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 1,
        weight: 1.5,
        radius: feature.properties.mag*5
      }
    }
  
  }).addTo(myMap); 

    // Define what  property in the features to use
    
    // Set color scale
    // scale: ["#ffffb2", "#b10026"],

    // // Number of breaks in step range
    // steps: 10,

    // // q for quartile, e for equidistant, k for k-means
    // mode: "q",
    // style: {
    //   // Border color
    //   color: "#fff",
    //   weight: 1,
    //   fillOpacity: 0.8
    // },
  })


