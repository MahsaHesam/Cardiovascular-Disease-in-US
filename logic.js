// Mapping between state abbreviations and their center coordinates
const stateCenters = {
  "AK": [61.370716, -152.404419], // Alaska
  "AL": [32.806671, -86.791130],  // Alabama
  "AR": [34.969704, -92.373123],  // Arkansas
  "AZ": [33.729759, -111.431221], // Arizona
  "CA": [36.778259, -119.417931], // California
  "CO": [39.059811, -105.311104], // Colorado
  "CT": [41.597782, -72.755371],  // Connecticut
  "DC": [38.897438, -77.026817],  // District of Columbia
  "DE": [39.318523, -75.507141],  // Delaware
  "FL": [27.766279, -81.686783],  // Florida
  "GA": [33.040619, -83.643074],  // Georgia
  "HI": [21.094318, -157.498337], // Hawaii
  "IA": [42.011539, -93.210526],  // Iowa
  "ID": [44.240459, -114.478828], // Idaho
  "IL": [40.349457, -88.986137],  // Illinois
  "IN": [39.849426, -86.258278],  // Indiana
  "KS": [38.526600, -96.726486],  // Kansas
  "KY": [37.668140, -84.670067],  // Kentucky
  "LA": [31.169546, -91.867805],  // Louisiana
  "MA": [42.230171, -71.530106],  // Massachusetts
  "MD": [39.063946, -76.802101],  // Maryland
  "ME": [44.693947, -69.381927],  // Maine
  "MI": [44.182205, -84.506836],  // Michigan
  "MN": [46.392410, -94.636230],  // Minnesota
  "MO": [38.456085, -92.288368],  // Missouri
  "MS": [32.741646, -89.678696],  // Mississippi
  "MT": [46.921925, -110.454353], // Montana
  "NC": [35.630066, -79.806419],  // North Carolina
  "ND": [47.528912, -99.784012],  // North Dakota
  "NE": [41.125370, -98.268082],  // Nebraska
  "NH": [43.452492, -71.563896],  // New Hampshire
  "NJ": [40.298904, -74.521011],  // New Jersey
  "NM": [34.840515, -106.248482], // New Mexico
  "NV": [38.313515, -117.055374], // Nevada
  "NY": [42.165726, -74.948051],  // New York
  "OH": [40.388783, -82.764915],  // Ohio
  "OK": [35.565342, -96.928917],  // Oklahoma
  "OR": [44.572021, -122.070938], // Oregon
  "PA": [40.590752, -77.209755],  // Pennsylvania
  "RI": [41.680893, -71.511780],  // Rhode Island
  "SC": [33.856892, -80.945007],  // South Carolina
  "SD": [44.299782, -99.438828],  // South Dakota
  "TN": [35.747845, -86.692345],  // Tennessee
  "TX": [31.054487, -97.563461],  // Texas
  "UT": [40.150032, -111.862434], // Utah
  "VA": [37.769337, -78.169968],  // Virginia
  "VT": [44.045876, -72.710686],  // Vermont
  "WA": [47.400902, -121.490494], // Washington
  "WI": [44.268543, -89.616508],  // Wisconsin
  "WV": [38.491226, -80.954456],  // West Virginia
  "WY": [42.755966, -107.302490]  // Wyoming
};

const stateAbbreviations = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
};

// Creating the map object
let myMap = L.map("map").setView([37.0902, -95.7129], 4); // Center of the US

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the US states GeoJSON
fetch('us-states.json')
.then(response => response.json())
.then(data => {
  // Process GeoJSON data
  L.geoJSON(data, {
    style: function(feature) {
      let stateName = feature.properties.name;
      let stateAbbreviation = stateAbbreviations[stateName];
      if (stateDataAvailable(stateAbbreviation)) {
        // Return style for states with data
        return {
          fillColor: 'red',
          color: "#ff7800",
          weight: 2,
          opacity: 0.65,
          fillOpacity: 0.8 
        };
      } else {
        // Return grayed-out style for states without data
        return {
          color: "#999",
          weight: 2,
          opacity: 0.65,
          fillOpacity: 0.2
        };
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on('click', function() {
        let stateName = feature.properties.name;
        let stateAbbreviation = stateAbbreviations[stateName];
        if (stateDataAvailable(stateAbbreviation)) {
          let selectedYear = document.getElementById('yearSelect').value;
          let selectedDiseaseType = document.getElementById('diseaseTypeSelect').value;
          let selectedEthnicity = document.getElementById('ethnicitySelect').value;
          loadCSVData(stateAbbreviation, selectedYear, selectedDiseaseType, selectedEthnicity);
        } else {
          alert(`No data available for ${stateName}`);
        }
      });
    }
  }).addTo(myMap);
})
.catch(error => {
  console.error('Error loading GeoJSON data:', error);
});

// Function to check if data is available for a specific state
function stateDataAvailable(stateAbbreviation) {
  let statesWithData = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 
    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 
    'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
    return statesWithData.includes(stateAbbreviation); // Check if the abbreviation is in the list
}

// Load the CSV data for a specific state and selected criteria when clicked
function loadCSVData(stateAbbreviation, year, diseaseType, selectedEthnicity) {
  console.log(`Loading data for ${stateAbbreviation} in ${year} for ${diseaseType} and ${selectedEthnicity}`);
  
  // Load the CSV data for the selected state
  d3.csv("Averaged_Cleaned_filtered_data.csv").then(function(data) {
    console.log(`Data loaded: ${data.length} records`);
    
    // Log the first few rows to verify data structure
    console.log('First few rows:', data.slice(0, 5));
    
    // Filter data based on selected criteria
    let filteredData = data.filter(d =>
      d['US States'] === stateAbbreviation &&
      parseFloat(d.Year) === parseFloat(year) &&
      d['Heart Disease Type'] === diseaseType &&
      d['Ethnicity'].trim().toLowerCase() === selectedEthnicity.trim().toLowerCase()
    );
    console.log(`Filtered data:`, filteredData);

    // Construct popup content based on filtered data
    let popupContent = `<h2>${stateAbbreviation} Incidence Data for ${year} - ${diseaseType} - ${selectedEthnicity}</h2>`;

    if (filteredData.length === 0) {
      popupContent += `<p>No data available for the selected criteria.</p>`;
    } else {
      // Group filtered data by gender
      let groupedDataByGender = groupBy(filteredData, 'Gender');
      // Iterate over each gender
      Object.entries(groupedDataByGender).forEach(([gender, genderData]) => {
        popupContent += `<h3>Gender: ${gender}</h3>`;
        // Group gender data by age range
        let groupedDataByAge = groupBy(genderData, 'Age range');
        // Iterate over each age range
        Object.entries(groupedDataByAge).forEach(([ageRange, ageData]) => {
          popupContent += `<h3>Age Range: ${ageRange}</h3>`;
          // Display incidence data for each age range
          ageData.forEach(entry => {
            popupContent += `<p>Incidence: ${entry['Data_Value/100_000 People']}</p>`;
          });
        });
      });
    }

    // Display popup with filtered data
    let stateCenter = stateCenters[stateAbbreviation];
    if (stateCenter) {
      L.popup()
        .setLatLng(stateCenter)
        .setContent(popupContent)
        .openOn(myMap);
    } else {
      alert(`Cannot find center for ${stateAbbreviation}`);
    }
  }).catch(function(error) {
    console.error('Error loading or filtering CSV data:', error);
  });
}

// Function to group array of objects by key
function groupBy(array, key) {
  return array.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj);
    return result;
  }, {});
}
