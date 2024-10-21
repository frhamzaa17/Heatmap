// Initialize the map
var map = L.map('heatmapContainer').setView([20.5937, 78.9629], 5); // Center the map on India

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Heatmap data: array of [latitude, longitude, intensity] values
var heatmapData = [
    [28.7041, 77.1025, 0.5],  // New Delhi
    [19.0760, 72.8777, 0.8],  // Mumbai (heatmap point)
    [13.0827, 80.2707, 0.7],  // Chennai
    [22.5726, 88.3639, 0.6],  // Kolkata
    [12.9716, 77.5946, 0.4],  // Bangalore
    [26.9124, 75.7873, 0.9],  // Jaipur
    [21.1458, 79.0882, 0.7],  // Nagpur
    [15.3173, 75.7139, 0.6],  // Karnataka region
    [24.5854, 73.7125, 0.5],  // Udaipur
    [23.2599, 77.4126, 0.7],  // Bhopal
    [25.3176, 82.9739, 0.9]   // Varanasi
];

// Create heatmap layer and add it to the map
L.heatLayer(heatmapData, {
    radius: 25,         // Radius of each heatmap point
    blur: 15,           // Blur intensity
    maxZoom: 17,        // Max zoom level
    max: 1              // Maximum point intensity
}).addTo(map);

// Add a marker for Mumbai
var mumbaiMarker = L.marker([19.0760, 72.8777]).addTo(map);

// Bind a popup to the Mumbai marker
mumbaiMarker.bindPopup("<b>Mumbai: Rainy Area</b>").openPopup();
