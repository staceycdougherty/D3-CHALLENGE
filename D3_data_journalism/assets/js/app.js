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

// Create an SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from data.csv file
d3.csv("assets/data/data.csv")
    .then(function(Data){

//Format the data
    Data.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });

//create scales
var xLinearScale = d3.scaleLinear()
    .domain([8.5, d3.max(Data, d => d.poverty)])
    .range([0, width]);

var yLinearScale = d3.scaleLinear()
    .domain([3.5, d3.max(Data, d => d.healthcare)])
    .range([height, 0]);

//creates axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

//append the axes to the chartGroup
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

//append text to chartGroup
chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.bottom -20})`)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.attr("fill", "black")
.text("In Poverty (%)")
.classed("active", true);


chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -(height / 2))
.attr("y", -40)
.text("Lacks Healthcare (%)")
.classed("active", true);


//make Circles
var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "lightblue")
    .attr("opacity", ".6")
    .attr("stroke-width", "1")
    .attr("stroke", "black");

    chartGroup.select("g")
    .selectAll("circle")
    .data(Data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy",-395)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black");
 
    console.log(Data);
});