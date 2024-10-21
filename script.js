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
    { city: "Agra", coords: [27.1767, 78.0081], aqi: 79 },      // Satisfactory
    { city: "Ahmedabad", coords: [23.0225, 72.5714], aqi: 85 }, // Satisfactory
    { city: "Aizawl", coords: [23.7271, 92.7176], aqi: 39 },    // Good
    { city: "Ajmer", coords: [26.4499, 74.6399], aqi: 87 },     // Satisfactory
    { city: "Alwar", coords: [27.5530, 76.6346], aqi: 85 },     // Satisfactory
    { city: "Amritsar", coords: [31.6340, 74.8723], aqi: 156 }, // Moderate
    { city: "Ankleshwar", coords: [21.6187, 73.0110], aqi: 54 },// Satisfactory
    { city: "Asansol", coords: [23.6850, 86.9833], aqi: 230 },  // Poor
    { city: "Aurangabad", coords: [19.8762, 75.3433], aqi: 60 },// Satisfactory
    { city: "Bagalkot", coords: [16.1867, 75.6960], aqi: 40 },  // Good
    { city: "Bengaluru", coords: [12.9716, 77.5946], aqi: 50 }, // Good
    { city: "Bhopal", coords: [23.2599, 77.4126], aqi: 74 },    // Satisfactory
    { city: "Delhi", coords: [28.7041, 77.1025], aqi: 310 },    // Very Poor
    { city: "Mumbai", coords: [19.0760, 72.8777], aqi: 51 },    // Satisfactory
    { city: "Kolkata", coords: [22.5726, 88.3639], aqi: 120 },  // Moderate
    { city: "Chennai", coords: [13.0827, 80.2707], aqi: 44 },   // Good
    { city: "Bangalore", coords: [12.9716, 77.5946], aqi: 50 },  // Good
    
    { city: "Baghpat", coords: [28.9448, 77.2185], aqi: 175 },    // Moderate
    { city: "Baghpat", coords: [28.9448, 77.2185], aqi: 175 },    // Moderate
{ city: "Bahadurgarh", coords: [28.6920, 76.9350], aqi: 255 }, // Poor
{ city: "Balasore", coords: [21.4946, 86.9317], aqi: 198 },   // Moderate
{ city: "Banswara", coords: [23.5460, 74.4335], aqi: 70 },    // Satisfactory
{ city: "Baran", coords: [25.1011, 76.5132], aqi: 85 },       // Satisfactory
{ city: "Barbil", coords: [22.1117, 85.3867], aqi: 140 },     // Moderate
{ city: "Bareilly", coords: [28.3670, 79.4304], aqi: 38 },    // Good
{ city: "Baripada", coords: [21.9336, 86.7289], aqi: 128 },   // Moderate
{ city: "Barmer", coords: [25.7500, 71.2500], aqi: 83 },      // Satisfactory
{ city: "Barrackpore", coords: [22.7666, 88.3630], aqi: 142 }, // Moderate
{ city: "Bathinda", coords: [30.2109, 74.9455], aqi: 84 },    // Satisfactory
{ city: "Begusarai", coords: [25.4185, 86.1336], aqi: 181 },  // Moderate
{ city: "Belgaum", coords: [15.8497, 74.4977], aqi: 30 },     // Good
{ city: "Bengaluru", coords: [12.9716, 77.5946], aqi: 50 },   // Good
{ city: "Bhagalpur", coords: [25.2425, 87.0150], aqi: 119 },  // Moderate
{ city: "Bharatpur", coords: [27.2173, 77.4901], aqi: 51 },   // Satisfactory
{ city: "Bhilai", coords: [21.1938, 81.3509], aqi: 70 },      // Satisfactory
{ city: "Bhilwara", coords: [25.3497, 74.6310], aqi: 86 },    // Satisfactory
{ city: "Bhiwadi", coords: [28.2105, 76.8606], aqi: 147 },    // Moderate
{ city: "Bhiwandi", coords: [19.2813, 73.0483], aqi: 56 },    // Satisfactory
{ city: "Bhiwani", coords: [28.7936, 76.1390], aqi: 289 },    // Poor
{ city: "Bhopal", coords: [23.2599, 77.4126], aqi: 74 },      // Satisfactory
{ city: "Bhubaneswar", coords: [20.2961, 85.8245], aqi: 104 }, // Moderate
{ city: "Bidar", coords: [17.9133, 77.5301], aqi: 33 },       // Good
{ city: "Bihar Sharif", coords: [25.2000, 85.5237], aqi: 156 }, // Moderate
{ city: "Bikaner", coords: [28.0229, 73.3119], aqi: 87 },     // Satisfactory
{ city: "Bilaspur", coords: [22.0796, 82.1391], aqi: 73 },    // Satisfactory
{ city: "Bileipada", coords: [22.1084, 85.3904], aqi: 172 },  // Moderate
{ city: "Boisar", coords: [19.8036, 72.7566], aqi: 68 },      // Satisfactory
{ city: "Brajrajnagar", coords: [21.8167, 83.9167], aqi: 83 }, // Satisfactory
{ city: "Bulandshahr", coords: [28.4030, 77.8573], aqi: 160 }, // Moderate
{ city: "Buxar", coords: [25.5647, 83.9777], aqi: 144 },      // Moderate
{ city: "Byasanagar", coords: [20.9382, 85.8173], aqi: 212 }, // Poor
{ city: "Chamarajanagar", coords: [11.9231, 76.9456], aqi: 42 }, // Good
{ city: "Chandigarh", coords: [30.7333, 76.7794], aqi: 162 }, // Moderate
{ city: "Charkhi Dadri", coords: [28.5930, 76.2711], aqi: 235 }, // Poor
{ city: "Chengalpattu", coords: [12.6926, 79.9767], aqi: 43 }, // Good
{ city: "Chennai", coords: [13.0827, 80.2707], aqi: 44 },     // Good
{ city: "Chhal", coords: [21.7390, 83.0661], aqi: 78 },       // Satisfactory
{ city: "Chikkaballapur", coords: [13.4350, 77.7270], aqi: 25 }, // Good
{ city: "Chikkamagaluru", coords: [13.3161, 75.7728], aqi: 47 }, // Good
{ city: "Chittorgarh", coords: [24.8887, 74.6269], aqi: 150 },   // Moderate
{ city: "Churu", coords: [28.2962, 74.9858], aqi: 193 },        // Moderate
{ city: "Coimbatore", coords: [11.0168, 76.9558], aqi: 41 },    // Good
{ city: "Cuddalore", coords: [11.7480, 79.7714], aqi: 86 },     // Satisfactory
{ city: "Cuttack", coords: [20.4625, 85.8828], aqi: 97 },       // Satisfactory
{ city: "Damoh", coords: [23.8360, 79.4413], aqi: 133 },        // Moderate
{ city: "Dausa", coords: [26.8938, 76.3373], aqi: 99 },         // Satisfactory
{ city: "Dehradun", coords: [30.3165, 78.0322], aqi: 135 },     // Moderate
{ city: "Delhi", coords: [28.7041, 77.1025], aqi: 310 },        // Very Poor
{ city: "Dewas", coords: [22.9659, 76.0553], aqi: 59 },         // Satisfactory
{ city: "Dholpur", coords: [26.7025, 77.8934], aqi: 64 },       // Satisfactory
{ city: "Dhule", coords: [20.9042, 74.7749], aqi: 54 },         // Satisfactory
{ city: "Dindigul", coords: [10.3673, 77.9803], aqi: 35 },      // Good
{ city: "Dungarpur", coords: [23.8431, 73.7147], aqi: 60 },     // Satisfactory
{ city: "Durgapur", coords: [23.5204, 87.3119], aqi: 215 },     // Poor
{ city: "Faridabad", coords: [28.4089, 77.3178], aqi: 165 },    // Moderate
{ city: "Fatehabad", coords: [29.5117, 75.4540], aqi: 174 },    // Moderate
{ city: "Firozabad", coords: [27.1591, 78.3957], aqi: 70 },     // Satisfactory
{ city: "Gadag", coords: [15.4321, 75.6387], aqi: 28 },         // Good
{ city: "Gandhinagar", coords: [23.2156, 72.6369], aqi: 48 },   // Good
{ city: "Gangtok", coords: [27.3314, 88.6138], aqi: 37 },      // Good
{ city: "Gaya", coords: [24.7955, 85.0002], aqi: 158 },        // Moderate
{ city: "Ghaziabad", coords: [28.6692, 77.4538], aqi: 257 },   // Poor
{ city: "Gorakhpur", coords: [26.7606, 83.3732], aqi: 122 },   // Moderate
{ city: "Greater Noida", coords: [28.4744, 77.5030], aqi: 183 }, // Moderate
{ city: "Gummidipoondi", coords: [13.4067, 80.1076], aqi: 65 }, // Satisfactory
{ city: "Gurugram", coords: [28.4595, 77.0266], aqi: 210 },    // Poor
{ city: "Guwahati", coords: [26.1445, 91.7362], aqi: 75 },     // Satisfactory
{ city: "Gwalior", coords: [26.2183, 78.1828], aqi: 157 },     // Moderate
{ city: "Hajipur", coords: [25.6957, 85.2098], aqi: 236 },     // Poor
{ city: "Haldia", coords: [22.0667, 88.0698], aqi: 209 },      // Poor
{ city: "Hanumangarh", coords: [29.5818, 74.3294], aqi: 291 }, // Poor
{ city: "Hapur", coords: [28.7297, 77.7805], aqi: 164 },       // Moderate
{ city: "Hassan", coords: [13.0072, 76.0966], aqi: 61 },       // Satisfactory
{ city: "Hisar", coords: [29.1492, 75.7217], aqi: 164 },       // Moderate
{ city: "Howrah", coords: [22.5958, 88.2636], aqi: 151 },      // Moderate
{ city: "Hyderabad", coords: [17.3850, 78.4867], aqi: 69 },    // Satisfactory
{ city: "Imphal", coords: [24.8170, 93.9368], aqi: 102 },      // Moderate
{ city: "Indore", coords: [22.7196, 75.8577], aqi: 51 },       // Satisfactory
{ city: "Jabalpur", coords: [23.1815, 79.9864], aqi: 126 },    // Moderate
{ city: "Jaipur", coords: [26.9124, 75.7873], aqi: 122 },      // Moderate
{ city: "Jaisalmer", coords: [26.9157, 70.9083], aqi: 115 },   // Moderate
{ city: "Jalandhar", coords: [31.3260, 75.5762], aqi: 131 },   // Moderate
{ city: "Jalgaon", coords: [21.0077, 75.5626], aqi: 94 },      // Satisfactory
{ city: "Jalna", coords: [19.8297, 75.8800], aqi: 59 },        // Satisfactory
{ city: "Jalore", coords: [25.3445, 72.6151], aqi: 138 },      // Moderate
{ city: "Jhalawar", coords: [24.5968, 76.1655], aqi: 71 },     // Satisfactory
{ city: "Jhansi", coords: [25.4484, 78.5685], aqi: 67 },       // Satisfactory
{ city: "Jhunjhunu", coords: [28.1288, 75.3990], aqi: 160 },   // Moderate
{ city: "Jind", coords: [29.3162, 76.3145], aqi: 277 },        // Poor
{ city: "Jodhpur", coords: [26.2389, 73.0243], aqi: 112 },     // Moderate
{ city: "Kadapa", coords: [14.4673, 78.8242], aqi: 43 },       // Good
{ city: "Kaithal", coords: [29.8010, 76.3986], aqi: 239 },     // Poor
{ city: "Kalaburagi", coords: [17.3297, 76.8343], aqi: 28 },   // Good
{ city: "Kalyan", coords: [19.2403, 73.1305], aqi: 42 },       // Good
{ city: "Kanpur", coords: [26.4499, 80.3319], aqi: 145 },      // Moderate
{ city: "Karauli", coords: [26.4983, 77.0150], aqi: 58 },      // Satisfactory
{ city: "Karnal", coords: [29.6857, 76.9905], aqi: 107 },      // Moderate
{ city: "Karur", coords: [10.9571, 78.0807], aqi: 42 },        // Good
{ city: "Kashipur", coords: [29.2137, 78.9569], aqi: 130 },    // Moderate
{ city: "Katni", coords: [23.8331, 80.4094], aqi: 96 },        // Satisfactory
{ city: "Keonjhar", coords: [21.6283, 85.5826], aqi: 143 },    // Moderate
{ city: "Khanna", coords: [30.7036, 76.2211], aqi: 150 },      // Moderate
{ city: "Khurja", coords: [28.2542, 77.8553], aqi: 169 },      // Moderate
{ city: "Kishanganj", coords: [26.1025, 87.9460], aqi: 90 },   // Satisfactory
{ city: "Kohima", coords: [25.6586, 94.1056], aqi: 78 },       // Satisfactory
{ city: "Kolhapur", coords: [16.7050, 74.2433], aqi: 102 },    // Moderate
{ city: "Kolkata", coords: [22.5726, 88.3639], aqi: 120 },     // Moderate
{ city: "Kollam", coords: [8.8932, 76.6141], aqi: 36 },        // Good
{ city: "Koppal", coords: [15.3470, 76.1545], aqi: 43 },        // Good
{ city: "Korba", coords: [22.3593, 82.7505], aqi: 56 },         // Satisfactory
{ city: "Kota", coords: [25.2138, 75.8648], aqi: 119 },         // Moderate
{ city: "Kunjemura", coords: [22.1200, 84.9200], aqi: 112 },    // Moderate
{ city: "Kurukshetra", coords: [29.9695, 76.8783], aqi: 188 },  // Moderate
{ city: "Latur", coords: [18.4088, 76.5604], aqi: 35 },         // Good
{ city: "Lucknow", coords: [26.8467, 80.9462], aqi: 169 },      // Moderate
{ city: "Ludhiana", coords: [30.9010, 75.8573], aqi: 156 },     // Moderate
{ city: "Madikeri", coords: [12.4244, 75.7382], aqi: 28 },      // Good
{ city: "Madurai", coords: [9.9252, 78.1198], aqi: 22 },        // Good
{ city: "Mahad", coords: [18.0833, 73.4167], aqi: 54 },         // Satisfactory
{ city: "Malegaon", coords: [20.5537, 74.5288], aqi: 99 },      // Satisfactory
{ city: "Mandi Gobindgarh", coords: [30.6930, 76.2926], aqi: 136 }, // Moderate
{ city: "Mandideep", coords: [23.0826, 77.5132], aqi: 121 },    // Moderate
{ city: "Mandikhera", coords: [27.8543, 77.0813], aqi: 107 },   // Moderate
{ city: "Manesar", coords: [28.3577, 76.9297], aqi: 168 },      // Moderate
{ city: "Mangalore", coords: [12.9141, 74.8560], aqi: 47 },     // Good
{ city: "Meerut", coords: [28.9845, 77.7064], aqi: 163 },       // Moderate
{ city: "Milupara", coords: [21.1236, 82.0980], aqi: 72 },      // Satisfactory
{ city: "Mira-Bhayandar", coords: [19.2952, 72.8544], aqi: 50 }, // Good
{ city: "Moradabad", coords: [28.8386, 78.7733], aqi: 128 },    // Moderate
{ city: "Motihari", coords: [26.6486, 84.9166], aqi: 70 },      // Satisfactory
{ city: "Mumbai", coords: [19.0760, 72.8777], aqi: 51 },        // Satisfactory
{ city: "Munger", coords: [25.3746, 86.4735], aqi: 173 },       // Moderate
{ city: "Muzaffarnagar", coords: [29.4737, 77.7045], aqi: 118 }, // Moderate
{ city: "Muzaffarpur", coords: [26.1209, 85.3647], aqi: 134 },  // Moderate
{ city: "Mysuru", coords: [12.2958, 76.6394], aqi: 41 },        // Good
{ city: "Nagaon", coords: [26.3464, 92.6845], aqi: 30 },        // Good
{ city: "Nagapattinam", coords: [10.7657, 79.8424], aqi: 38 },  // Good
{ city: "Nagaur", coords: [27.2020, 73.7409], aqi: 186 },       // Moderate
{ city: "Nagpur", coords: [21.1458, 79.0882], aqi: 95 },        // Satisfactory
{ city: "Nanded", coords: [19.1383, 77.3206], aqi: 56 },        // Satisfactory
{ city: "Narnaul", coords: [28.0444, 76.1083], aqi: 177 },      // Moderate
{ city: "Nashik", coords: [19.9975, 73.7898], aqi: 53 },        // Satisfactory
{ city: "Navi Mumbai", coords: [19.0330, 73.0297], aqi: 54 },   // Satisfactory
{ city: "Nayagarh", coords: [20.1286, 85.0951], aqi: 67 },      // Satisfactory
{ city: "Noida", coords: [28.5355, 77.3910], aqi: 252 },        // Poor
{ city: "Ooty", coords: [11.4064, 76.6932], aqi: 25 },          // Good
{ city: "Palkalaiperur", coords: [10.7905, 78.7047], aqi: 29 }, // Good
{ city: "Palwal", coords: [28.1447, 77.3260], aqi: 90 },        // Satisfactory
{ city: "Panchkula", coords: [30.6942, 76.8606], aqi: 184 },    // Moderate
{ city: "Panipat", coords: [29.3909, 76.9635], aqi: 158 },      // Moderate
{ city: "Parbhani", coords: [19.2704, 76.7704], aqi: 60 },      // Satisfactory
{ city: "Patiala", coords: [30.3398, 76.3869], aqi: 115 },      // Moderate
{ city: "Patna", coords: [25.5941, 85.1376], aqi: 224 },        // Poor
{ city: "Pimpri-Chinchwad", coords: [18.6279, 73.8131], aqi: 60 }, // Satisfactory
{ city: "Pithampur", coords: [22.6056, 75.6964], aqi: 55 },     // Satisfactory
{ city: "Pratapgarh", coords: [24.0322, 74.7810], aqi: 83 },    // Satisfactory
{ city: "Prayagraj", coords: [25.4358, 81.8463], aqi: 78 },     // Satisfactory
{ city: "Puducherry", coords: [11.9416, 79.8083], aqi: 48 },    // Good
{ city: "Pudukottai", coords: [10.3813, 78.8215], aqi: 49 },    // Good
{ city: "Pune", coords: [18.5204, 73.8567], aqi: 59 },          // Satisfactory
{ city: "Purnia", coords: [25.7771, 87.4753], aqi: 51 },        // Satisfactory
{ city: "Raipur", coords: [21.2514, 81.6296], aqi: 92 },        // Satisfactory
{ city: "Rairangpur", coords: [22.2731, 86.1660], aqi: 149 },   // Moderate
{ city: "Rajamahendravaram", coords: [17.0052, 81.7778], aqi: 46 }, // Good
{ city: "Rajgir", coords: [25.0277, 85.4206], aqi: 227 },       // Poor
{ city: "Ramanathapuram", coords: [9.3716, 78.8308], aqi: 38 }, // Good
{ city: "Ranipet", coords: [12.9292, 79.3333], aqi: 33 },       // Good
{ city: "Ratlam", coords: [23.3315, 75.0373], aqi: 65 },        // Satisfactory
{ city: "Rohtak", coords: [28.8955, 76.6066], aqi: 283 },       // Poor
{ city: "Rourkela", coords: [22.2604, 84.8536], aqi: 128 },     // Moderate
{ city: "Rupnagar", coords: [30.9688, 76.5256], aqi: 96 },      // Satisfactory
{ city: "Sagar", coords: [23.8388, 78.7378], aqi: 57 },         // Satisfactory
{ city: "Saharsa", coords: [25.8851, 86.6006], aqi: 112 },      // Moderate
{ city: "Salem", coords: [11.6643, 78.1460], aqi: 54 },         // Satisfactory
{ city: "Sasaram", coords: [24.9501, 84.0316], aqi: 57 },       // Satisfactory
{ city: "Satna", coords: [24.6005, 80.8322], aqi: 51 },         // Satisfactory
{ city: "Sawai Madhopur", coords: [26.0232, 76.3441], aqi: 84 }, // Satisfactory
{ city: "Shivamogga", coords: [13.9299, 75.5681], aqi: 40 },    // Good
{ city: "Sikar", coords: [27.6094, 75.1399], aqi: 155 },         // Moderate
{ city: "Silchar", coords: [24.8333, 92.7789], aqi: 50 },        // Good
{ city: "Siliguri", coords: [26.7271, 88.3953], aqi: 60 },       // Satisfactory
{ city: "Singrauli", coords: [24.1986, 82.6754], aqi: 300 },     // Poor
{ city: "Sirohi", coords: [24.8857, 72.8615], aqi: 83 },         // Satisfactory
{ city: "Sivasagar", coords: [26.9842, 94.6395], aqi: 59 },      // Satisfactory
{ city: "Siwan", coords: [26.2173, 84.3567], aqi: 139 },         // Moderate
{ city: "Solapur", coords: [17.6599, 75.9064], aqi: 50 },        // Good
{ city: "Sri Ganganagar", coords: [29.9038, 73.8772], aqi: 122 }, // Moderate
{ city: "Suakati", coords: [21.4669, 85.6297], aqi: 132 },       // Moderate
{ city: "Surat", coords: [21.1702, 72.8311], aqi: 83 },          // Satisfactory
{ city: "Talcher", coords: [20.9505, 85.2335], aqi: 143 },       // Moderate
{ city: "Tensa", coords: [21.7588, 85.1664], aqi: 151 },         // Moderate
{ city: "Thane", coords: [19.2183, 72.9781], aqi: 55 },          // Satisfactory
{ city: "Thanjavur", coords: [10.7870, 79.1378], aqi: 29 },      // Good
{ city: "Thiruvananthapuram", coords: [8.5241, 76.9366], aqi: 46 }, // Good
{ city: "Thoothukudi", coords: [8.7642, 78.1348], aqi: 53 },     // Satisfactory
{ city: "Thrissur", coords: [10.5276, 76.2144], aqi: 34 },       // Good
{ city: "Tirunelveli", coords: [8.7139, 77.7567], aqi: 33 },     // Good
{ city: "Tirupati", coords: [13.6288, 79.4192], aqi: 58 },       // Satisfactory
{ city: "Tirupur", coords: [11.1085, 77.3411], aqi: 61 },        // Satisfactory
{ city: "Tonk", coords: [26.1669, 75.7893], aqi: 147 },          // Moderate
{ city: "Tumakuru", coords: [13.3389, 77.1010], aqi: 56 },       // Satisfactory
{ city: "Udaipur", coords: [24.5854, 73.7125], aqi: 123 },       // Moderate
{ city: "Udupi", coords: [13.3409, 74.7421], aqi: 30 },          // Good
{ city: "Ujjain", coords: [23.1793, 75.7849], aqi: 127 },        // Moderate
{ city: "Ulhasnagar", coords: [19.2259, 73.1645], aqi: 50 },     // Good
{ city: "Vapi", coords: [20.3714, 72.9043], aqi: 32 },           // Good
{ city: "Varanasi", coords: [25.3176, 82.9739], aqi: 74 },       // Satisfactory
{ city: "Vatva", coords: [22.9611, 72.6030], aqi: 69 },          // Satisfactory
{ city: "Vellore", coords: [12.9165, 79.1325], aqi: 31 },        // Good
{ city: "Vijayapura", coords: [16.8302, 75.7100], aqi: 39 },     // Good
{ city: "Vijayawada", coords: [16.5062, 80.6480], aqi: 48 },     // Good
{ city: "Virar", coords: [19.4559, 72.8114], aqi: 37 },          // Good
{ city: "Visakhapatnam", coords: [17.6868, 83.2185], aqi: 51 },  // Satisfactory
{ city: "Vrindavan", coords: [27.5833, 77.7000], aqi: 94 },      // Satisfactory
{ city: "Yamuna Nagar", coords: [30.1290, 77.2674], aqi: 174 }   // Moderate





    
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
    circle.bindPopup(`<b>${data.city}</b><br>AQI: ${data.aqi}<br>Category: ${getCategory(data.aqi)}`);
});

// Function to get AQI category based on value
function getCategory(aqi) {
    return aqi > 400 ? 'Severe' :
           aqi > 300 ? 'Very Poor' :
           aqi > 200 ? 'Poor' :
           aqi > 100 ? 'Moderate' :
           aqi > 50  ? 'Satisfactory' : 'Good';
}
