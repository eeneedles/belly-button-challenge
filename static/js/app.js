const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
function BuildChart(Input){


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  let unit = data.samples
  
  
  // Call the custom function with filter()
  let topTen = unit.filter(sample => sample.id === Input)[0];
  console.log(topTen)

  let trace1 = {
    x: topTen.sample_values.slice(0, 10).reverse(),
    y: topTen.otu_ids.map(idNumbers => `otu ${idNumbers}`).slice(0, 10).reverse(),
    text: topTen.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };
  
  // Data array
  let barData = [trace1];
  
  // Apply a title to the layout
  let layout = {
    title: "Belly Button OTU's",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", barData, layout);

  let trace2 = {
    x: topTen.otu_ids,
    y: topTen.sample_values,
    text: topTen.otu_labels,
    mode: "markers",
    marker: {
      color:topTen.otu_ids,
      size: topTen.sample_values
    }
  };
  
  // Data array
  let barData2 = [trace2];
  
  // Apply a title to the layout
  let layout2 = {
    title2: "Belly Button OTU's",
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bubble", barData2, layout2);
  
});}


//Update Metadata for Demographic Info Chart
function BuildChart2(Input){


  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
    console.log(data);
    let unit = data.metadata
    
    
    // Call the custom function with filter()
    let topTen = unit.filter(sample => sample.id === parseInt(Input))[0];
    console.log(topTen)
    let metaTable = d3.select("#sample-metadata");
    metaTable.html('')
    for(key in topTen){
      metaTable.append("h5").text(`${key}: ${topTen[key]}`)
    }
  });}  

  function optionChanged(Input){
    BuildChart2(Input)
    BuildChart(Input) 
  }

  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
  
    d3.json(url).then(function(data) {
      console.log(data);
      let unit = data.names

      for (let j = 0; j < unit.length; j++) {
        dropdownMenu.append("option").text(unit[j]).property("value", unit[j])
      }
      BuildChart2(unit[0])
      BuildChart(unit[0])
    })
  }
  updatePlotly()