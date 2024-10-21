// Initialize the map
var map = L.map('heatmapContainer').setView([20.5937, 78.9629], 5); // Center the map on India

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to determine color based on AQI value
function getColor(aqi) {
    return aqi > 300 ? '#7e0023' : // Very Poor (Dark Red)
           aqi > 200 ? '#ff0000' : // Poor (Red)
           aqi > 100 ? '#ff7e00' : // Moderate (Orange)
           aqi > 50  ? '#ffff00' : // Satisfactory (Yellow)
                        '#00e400';  // Good (Green)
}

// AQI data from the document
var aqiData = [
    { city: "New Delhi", coords: [28.7041, 77.1025], aqi: 310 },
    { city: "Mumbai", coords: [19.0760, 72.8777], aqi: 51 },
    { city: "Kolkata", coords: [22.5726, 88.3639], aqi: 120 },
    { city: "Chennai", coords: [13.0827, 80.2707], aqi: 44 },
    { city: "Bangalore", coords: [12.9716, 77.5946], aqi: 50 }
];

// Loop through AQI data to create markers with different colors
aqiData.forEach(function(data) {
    var circle = L.circle(data.coords, {
        color: getColor(data.aqi),
        fillColor: getColor(data.aqi),
        fillOpacity: 0.5,
        radius: 20000
    }).addTo(map);

    // Bind a popup to each circle marker
    circle.bindPopup(`<b>${data.city}</b><br>AQI: ${data.aqi}`);
});
