var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

var streetmap =new L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var vColor = "";
var vRadius = "";

function forEachFeature(feature, layer) {

  var popupContent = `<h3>Place: ${feature.properties.place} </h3> <hr> <p>Time: ${Date(feature.properties.time)} </p> <hr> <p>Magnitude: ${feature.properties.mag} </p>`;
   
  layer.bindPopup(popupContent);
};

var earthquake = L.geoJSON(null, {
  onEachFeature: forEachFeature, 
  pointToLayer: function (feature, latlng) {

    if (feature.properties.mag > 4.5){
      vColor = "#b30000";
    }
    else if (feature.properties.mag > 3.5){
      vColor = "#e34a33";
    }
    else {
      vColor = "#fc8d59";
    };
    return L.circleMarker(latlng, {'radius': feature.properties.mag * 3,  
                                    'opacity': .5,
                                    'color': "white",
                                    'fillColor': vColor, 
                                    'fillOpacity': 0.75});
  }
});

// Get GeoJSON data and create features.
d3.json(queryUrl, function(data) {                        
  earthquake.addData(data);                              
});

earthquake.addTo(myMap);
