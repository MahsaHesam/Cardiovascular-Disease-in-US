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
  "ID": [44.240459, -114.478828], // Idaho
  "IL": [40.349457, -88.986137]   // Illinois
  // Add more states as needed
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
  // Add more states as needed
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
  let statesWithData = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL']; // List of states with data
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
      d['Ethnicity'] === selectedEthnicity
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
        popupContent += `<h2>Gender: ${gender}</h2>`;
        // Group gender data by age range
        let groupedDataByAge = groupBy(genderData, 'Age range');
        // Iterate over each age range
        Object.entries(groupedDataByAge).forEach(([ageRange, ageData]) => {
          popupContent += `<h2>Age Range: ${ageRange}</h2>`;
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
    console.error('Error loading CSV data:', error);
  });
}

// Function to group array of objects by key
function groupBy(array, key) {
  return array.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj);
    return result;
  }, {});
}
