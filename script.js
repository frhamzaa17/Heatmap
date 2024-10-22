// Initialize the map
var map = L.map('heatmapContainer').setView([20.5937, 78.9629], 5); // Center the map on India

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to determine color based on AQI value
function getColor(aqi) {
    return aqi > 400 ? '#7e0023' :  // Severe
           aqi > 300 ? '#d32f2f' :  // Very Poor
           aqi > 200 ? '#ff9800' :  // Poor
           aqi > 100 ? '#ffeb3b' :  // Moderate
           aqi > 50  ? '#9cd84a' :  // Satisfactory
                        '#00e400';   // Good
}

// AQI data for multiple cities (based on PDF & Sample Data)
var aqiData = [
    { city: "Tirupati", coords: [13.6288, 79.4192], aqi: 90.7, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Vijaywada", coords: [16.5062, 80.6480], aqi: 102.2, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Visakhapatnam", coords: [17.6868, 43.2815], aqi: 119.5, pollutants: ["PM10", "PM2.5"] }, // Moderate
{ city: "Dibrugarh", coords: [27.4728, 94.9110], aqi: 95.1, pollutants: ["PM10", "PM2.5"] },      // Satisfactory
{ city: "Guwhati", coords: [26.1445, 91.7362], aqi: 95.1, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Silchar", coords: [24.8333, 92.7789], aqi: 67.6, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Patna", coords: [25.5941, 85.1376], aqi: 168.8, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Darbangha", coords: [26.1542, 85.8918], aqi: 169.8, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Chapra", coords: [25.7804, 84.7471], aqi: 172.9, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Raipur", coords: [21.2514, 81.6296], aqi: 88.6, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Raigarh", coords: [21.8738, 83.3975], aqi: 92.8, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Bilaspur", coords: [22.0796, 82.1450], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Daman", coords: [20.3970, 72.8331], aqi: 90.7, pollutants: ["PM10", "PM2.5"] },          // Satisfactory
{ city: "Silvasa", coords: [20.2639, 73.0179], aqi: 88.6, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Delhi", coords: [28.6139, 77.2090], aqi: 172.9, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Panjim", coords: [15.4909, 73.8278], aqi: 54.5, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Vasco", coords: [15.4006, 73.7555], aqi: 80.2, pollutants: ["PM10", "PM2.5"] },          // Satisfactory
{ city: "Usgao Pale", coords: [15.5220, 73.8400], aqi: 84.4, pollutants: ["PM10", "PM2.5"] },     // Satisfactory
{ city: "Ahemdabad", coords: [23.0225, 72.5714], aqi: 114.5, pollutants: ["PM10", "PM2.5"]},
{ city: "Tirupati", coords: [13.6288, 79.4192], aqi: 90.7, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Vijaywada", coords: [16.5062, 80.6480], aqi: 102.2, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Visakhapatnam", coords: [17.6868, 43.2815], aqi: 119.5, pollutants: ["PM10", "PM2.5"] }, // Moderate
{ city: "Dibrugarh", coords: [27.4728, 94.9110], aqi: 95.1, pollutants: ["PM10", "PM2.5"] },      // Satisfactory
{ city: "Guwhati", coords: [26.1445, 91.7362], aqi: 95.1, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Silchar", coords: [24.8333, 92.7789], aqi: 67.6, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Patna", coords: [25.5941, 85.1376], aqi: 168.8, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Darbangha", coords: [26.1542, 85.8918], aqi: 169.8, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Chapra", coords: [25.7804, 84.7471], aqi: 172.9, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Raipur", coords: [21.2514, 81.6296], aqi: 88.6, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Raigarh", coords: [21.8738, 83.3975], aqi: 92.8, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Bilaspur", coords: [22.0796, 82.1450], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Daman", coords: [20.3970, 72.8331], aqi: 90.7, pollutants: ["PM10", "PM2.5"] },          // Satisfactory
{ city: "Silvasa", coords: [20.2639, 73.0179], aqi: 88.6, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Delhi", coords: [28.6139, 77.2090], aqi: 172.9, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Panjim", coords: [15.4909, 73.8278], aqi: 54.5, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Vasco", coords: [15.4006, 73.7555], aqi: 80.2, pollutants: ["PM10", "PM2.5"] },          // Satisfactory
{ city: "Usgao Pale", coords: [15.5220, 73.8400], aqi: 84.4, pollutants: ["PM10", "PM2.5"] },     // Satisfactory
{ city: "Ahemdabad", coords: [23.0225, 72.5714], aqi: 114.5, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Gandhinagar", coords: [23.2156, 72.6369], aqi: 129.3, pollutants: ["PM10", "PM2.5"] },   // Moderate
{ city: "Surat", coords: [21.1702, 72.8311], aqi: 134.2, pollutants: ["PM10", "PM2.5"] },          // Moderate
{ city: "Ambala", coords: [30.3781, 76.7766], aqi: 131.8, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Gurugram", coords: [28.4595, 77.0266], aqi: 168.8, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Kurukshetra", coords: [29.9695, 76.8783], aqi: 160.6, pollutants: ["PM10", "PM2.5"] },   // Moderate
{ city: "Shimla", coords: [31.1050, 77.1640], aqi: 66.6, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Manali", coords: [32.2432, 77.1892], aqi: 55, pollutants: ["PM10", "PM2.5"] },           // Satisfactory
{ city: "Srinagar", coords: [34.0837, 74.7973], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Jammu", coords: [32.7266, 74.8570], aqi: 108.9, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Ranchi", coords: [23.3441, 85.3096], aqi: 76.2, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Dhanbad", coords: [23.7957, 86.4304], aqi: 126.7, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Jamshedpur", coords: [22.8046, 86.2029], aqi: 87.6, pollutants: ["PM10", "PM2.5"] },     // Satisfactory
{ city: "Banglore", coords: [12.9716, 77.5946], aqi: 92.8, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Mysore", coords: [12.2958, 76.6394], aqi: 67.6, pollutants: ["PM10", "PM2.5"] },          // Satisfactory
{ city: "Raichur", coords: [16.2160, 77.3566], aqi: 90.7, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Thiruvananthapuram", coords: [8.5241, 76.9366], aqi: 82.3, pollutants: ["PM10", "PM2.5"] }, // Satisfactory
{ city: "Wayanad", coords: [11.6964, 76.0773], aqi: 71.8, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Kochi", coords: [9.9312, 76.2673], aqi: 152.3, pollutants: ["PM10", "PM2.5"] },           // Moderate
{ city: "Indore", coords: [22.7196, 75.8577], aqi: 117, pollutants: ["PM10", "PM2.5"] },           // Moderate
{ city: "Bhopal", coords: [23.2599, 77.4126], aqi: 141.6, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Gwalior", coords: [26.2124, 78.1772], aqi: 155.6, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Mumbai", coords: [19.0760, 72.8777], aqi: 134.2, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Pune", coords: [18.5204, 73.8567], aqi: 160, pollutants: ["PM10", "PM2.5"] },             // Moderate
{ city: "Aurangabad", coords: [19.8758, 75.3393], aqi: 152.1, pollutants: ["PM10", "PM2.5"] },      // Moderate
{ city: "Imphal", coords: [24.8108, 93.9386], aqi: 50, pollutants: ["PM10", "PM2.5"] },            // Good
{ city: "Shillong", coords: [25.5788, 91.8933], aqi: 67.6, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Aizawl", coords: [23.7307, 92.7173], aqi: 41.7, pollutants: ["PM10", "PM2.5"] },          // Good
{ city: "Kohima", coords: [25.6751, 94.1086], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Bhubaneshwar", coords: [20.2961, 85.8245], aqi: 107.2, pollutants: ["PM10", "PM2.5"] },   // Moderate
{ city: "Rourkela", coords: [22.2604, 84.8536], aqi: 117.6, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Puri", coords: [19.8135, 85.8312], aqi: 69.3, pollutants: ["PM10", "PM2.5"] },            // Satisfactory
{ city: "Puducherry", coords: [11.9416, 79.8083], aqi: 78.1, pollutants: ["PM10", "PM2.5"] },       // Satisfactory
{ city: "Chandigarh", coords: [30.7333, 76.7794], aqi: 151.8, pollutants: ["PM10", "PM2.5"] },     // Moderate
{ city: "Amritsar", coords: [31.6340, 74.8723], aqi: 139.2, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Ludhiana", coords: [30.9010, 75.8573], aqi: 152.8, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Jaipur", coords: [26.9124, 75.7873], aqi: 151.8, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Kota", coords: [25.2138, 75.8648], aqi: 153.3, pollutants: ["PM10", "PM2.5"] },           // Moderate
{ city: "Jodhpur", coords: [26.2389, 73.0243], aqi: 158, pollutants: ["PM10", "PM2.5"] },          // Moderate
{ city: "Gangtok", coords: [27.3314, 88.6138], aqi: 52.9, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Chennai", coords: [13.0843, 80.2705], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },         // Satisfactory
{ city: "Coimbatore", coords: [11.0168, 76.9558], aqi: 82.3, pollutants: ["PM10", "PM2.5"] },      // Satisfactory
{ city: "Ooty", coords: [11.4102, 76.6950], aqi: 69.7, pollutants: ["PM10", "PM2.5"] },            // Satisfactory
{ city: "Warangal", coords: [17.9693, 79.5926], aqi: 54.5, pollutants: ["PM10", "PM2.5"] },        // Satisfactory
{ city: "Lucknow", coords: [26.8467, 80.9462], aqi: 154.9, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Prayagraj", coords: [25.4358, 81.8463], aqi: 124.4, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Agra", coords: [27.1767, 78.0081], aqi: 156.4, pollutants: ["PM10", "PM2.5"] },           // Moderate
{ city: "Noida", coords: [28.5355, 77.3910], aqi: 163.7, pollutants: ["PM10", "PM2.5"] },          // Moderate
{ city: "Muzaffarnagar", coords: [29.4727, 77.7085], aqi: 170.4, pollutants: ["PM10", "PM2.5"] },  // Moderate
{ city: "Hyderabad", coords: [17.4065, 78.4772], aqi: 109.6, pollutants: ["PM10", "PM2.5"] },      // Moderate
{ city: "Ramagundam", coords: [18.7519, 79.5134], aqi: 139.2, pollutants: ["PM10", "PM2.5"] },      // Moderate
{ city: "Agartala", coords: [23.8315, 91.2868], aqi: 144.8, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Durgapur", coords: [23.5204, 87.3119], aqi: 154.4, pollutants: ["PM10", "PM2.5"] },        // Moderate
{ city: "Howrah", coords: [22.5958, 88.2636], aqi: 155.9, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Kolkata", coords: [22.5744, 88.3629], aqi: 121.9, pollutants: ["PM10", "PM2.5"] },         // Moderate
{ city: "Dehradun", coords: [30.3165, 78.0322], aqi: 152.8, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Rishikesh", coords: [30.1158, 78.2853], aqi: 159.5, pollutants: ["PM10", "PM2.5"] },       // Moderate
{ city: "Haldwani", coords: [29.2183, 79.5130], aqi: 90.7, pollutants: ["PM10", "PM2.5"] }          // Good



    
];

// Loop through AQI data to create markers with different colors
aqiData.forEach(function(data) {
    var circle = L.circle(data.coords, {
        color: getColor(data.aqi),
        fillColor: getColor(data.aqi),
        fillOpacity: 0.5,
        radius: 20000
    }).addTo(map);

    // Bind a popup to each circle marker including pollutants
    circle.bindPopup(`<b>${data.city}</b><br>AQI: ${data.aqi}<br>Category: ${getCategory(data.aqi)}<br>Pollutants: ${data.pollutants.join(", ")}`);
});

// Function to get AQI category based on value
function getCategory(aqi) {
    return aqi > 400 ? 'Severe' :
           aqi > 300 ? 'Very Poor' :
           aqi > 200 ? 'Poor' :
           aqi > 100 ? 'Moderate' :
           aqi > 50  ? 'Satisfactory' : 'Good';
}
