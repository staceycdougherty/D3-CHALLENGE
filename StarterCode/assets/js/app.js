// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from data.csv file
d3.csv("assets/data/data.csv")
    .then(function(riskData){

//Turn strings into ints
    riskData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });

//X and Y scales
let xLinearScale = d3.scaleLinear()
    .domain([8.5, d3.max(riskData, d => d.poverty)])
    .range([0, width]);

let yLinearScale = d3.scaleLinear()
    .domain([3.5, d3.max(riskData, d => d.healthcare)])
    .range([height, 0]);

