// read the data to the console
console.log(data01);

function barChart(input){

}

function sunburst(input){

}

function init(){
    let firstIncident = data01[0]

    barChart(firstIncident);

    sunburst(firstIncident);
}

function optionChanged(item){
    barChart(item);

    sunburst(item);
}

init();