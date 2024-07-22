// Creating the map object
let myMap = L.map("map", {
    center: [35.2271, -80.8431],
    zoom: 11
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//console.log(data01)

// Give data a variable
let crimeData = data01


// Make a cluster marker layer by making a cluster group object
let markers = L.markerClusterGroup();


// Create for loop to ignore NaN in crimeData
for (var i = 0; i < crimeData.length; i++)

{
  //console.log(crimeData[i])
  let location = [crimeData[i].LATITUDE_PUBLIC, crimeData[i].LONGITUDE_PUBLIC];
  
 // Add a marker to the cluster group using the L.marker() and 
// .addLayer() functions
  markers.addLayer(L.marker(location))

  // Add popup details
  .bindPopup(`<h2>Crime Details:</h2><br><hr><br>Incident Description: ${crimeData[i].HIGHEST_NIBRS_DESCRIPTION}<br>Address: ${crimeData[i].LOCATION}<br>Patrol Division: ${crimeData[i].CMPD_PATROL_DIVISION}`);
    // if (crimeData[i]["CMPD_PATROL_DIVISION"]){
  //   //console.log(crimeData[i])
  // }
}
myMap.addLayer(markers);

