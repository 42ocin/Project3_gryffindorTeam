// read the data to the console
console.log(data01);

// populate the dropdown box
// push unique list of values from dictionary to populate clearance status array
let clearanceStatusOptions = [...new Set(data01.map(item => item.CLEARANCE_STATUS))];

// select dropdown id
var dropdown = d3.select("#selDataset");

// push list of clearance statuses into dropdown box
for (var k = 0; k < clearanceStatusOptions.length; k++) {
    dropdown.append("option").text(clearanceStatusOptions[k]).property("value", clearanceStatusOptions[k]);
}

// define function to create bar chart based on clearance status
function barChart(input){
	// subset by dataset, filtering for "CLEARANCE_STATUS" set to 'input'
	let selected = [input]
	const subset = data01.filter(({
	  CLEARANCE_STATUS
	}) => selected.includes(CLEARANCE_STATUS));
	
	// Get variables for barChart
	let incident_types = subset.map(result => result.HIGHEST_NIBRS_DESCRIPTION)
	incident_counts = {};
	for(var i=0; i<incident_types.length; i++){
		let place = incident_types[i];
		incident_counts[place] = incident_counts[place] ? incident_counts[place] +1:1;
	};
	
	// Function from [https://www.geeksforgeeks.org/how-to-sort-a-dictionary-by-value-in-javascript/]
	function sortDictByValue(dict) {
	  return Object.keys(dict)
		.sort((a, b) => dict[b] - dict[a])
		.reduce((acc, key) => {
		  acc[key] = dict[key];
		  return acc;
		}, {});
	}
	
	incident_counts_sorted = sortDictByValue(incident_counts);
	
	// Set up barChart
	let barChart_trace = {
		x: Object.keys(incident_counts_sorted),
		y: Object.values(incident_counts_sorted),
		type: "bar"
	}
	
	let barChart_layout = {
		title: "Crime Occurances"
	};
	
	// Render the Bar Chart
	Plotly.newPlot("bar", [barChart_trace], barChart_layout);
}

// define function to create pie charts based on clearance status
function pieCharts(input){
    // create unique lists of LOCATION_TYPE_DESCRIPTION, PLACE_TYPE_DESCRIPTION, AND PLACE_DETAIL_DESCRITPION
    // define empty arrays for data with clearance status option
    let locTypeArr = [];
    let placeDescArr = [];
    let placeDetailArr = [];

    // loop through data01 to create data arrays 
    for (var i = 0; i < data01.length; i++) {
        // conditional statement to add only values with selected clearance status option
        if (data01[i].CLEARANCE_STATUS == input) {
            locTypeArr.push(data01[i].LOCATION_TYPE_DESCRIPTION);
            placeDescArr.push(data01[i].PLACE_TYPE_DESCRIPTION);
            placeDetailArr.push(data01[i].PLACE_DETAIL_DESCRIPTION);
        }
    }

    // sort arrays
    locTypeArr.sort();
    placeDescArr.sort();
    placeDetailArr.sort();

    // loop through arrays to count values and create unique lists for labels
    var count = 1;

    let locTypeLabels = [];
    let placeDescLabels = [];
    let placeDetailLabels = [];

    let locTypeCounts = [];
    let placeDescCounts = [];
    let placeDetailCounts = [];

    for (var j = 0; j < locTypeArr.length; j++) {
        if (locTypeArr[j] == locTypeArr[j+1]) {
            count += 1;
        }
        else {
            locTypeCounts.push(count);
            locTypeLabels.push(locTypeArr[j]);
            count = 1;
        }
    }

    for (var j = 0; j < placeDescArr.length; j++) {
        if (placeDescArr[j] == placeDescArr[j+1]) {
            count += 1;
        }
        else {
            placeDescCounts.push(count);
            placeDescLabels.push(placeDescArr[j]);
            count = 1;
        }
    }

    for (var j = 0; j < placeDetailArr.length; j++) {
        if (placeDetailArr[j] == placeDetailArr[j+1]) {
            count += 1;
        }
        else {
            placeDetailCounts.push(count);
            placeDetailLabels.push(placeDetailArr[j]);
            count = 1;
        }
    }

    // populate data variable for pie charts
    var data = [
        {
            values: locTypeCounts,
            labels: locTypeLabels,
            domain: {column: 0},
            name: "Location Type",
            hoverinfo: "label+percent+name",
            type: "pie"
        },{
            values: placeDescCounts,
            labels: placeDescLabels,
            domain: {column: 1},
            name: "Place<br>Description",
            hoverinfo: "label+percent+name",
            type: "pie"
        },{
            values: placeDetailCounts,
            labels: placeDetailLabels,
            domain: {column: 2},
            name: "Place Details",
            hoverinfo: "label+percent+name",
            type: "pie"
        }
    ];

    // define layout for pie charts
    var layout = {
        title: "Location Descriptions and Details",
        height: 400,
        width: 900,
        showlegend: false,
        grid: {rows: 1, columns: 3}
    };

    // create new plots
    Plotly.newPlot("pie", data, layout);
}

// define initialization function
function init(){
    // select first clearance status option
    let clearanceStatus = clearanceStatusOptions[0]

    // populate bar chart with first clearanceStatus data
    barChart(clearanceStatus);

    // populate pie charts with first clearanceStatus data
    pieCharts(clearanceStatus);
}

// define optionChanged function for when the user changes clearance status dropdown option
function optionChanged(statusOption){
    // populate bar chart with new clearance status option data
    barChart(statusOption);

    // populate pie charts with new clearance status option data
    pieCharts(statusOption);
}

// initialize dashbaord with first clearance status data
init();