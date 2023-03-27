let dataset
let simulation, nodes
let categoryLegend, salaryLegend
let interval, trans_timeout
let maxWords = 0;
let maxName = "";
var div_year
var selectedYear
var selected_stat

var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', 
                '#800000', '#008000', '#000080', '#808000', '#800080', '#008080',              
                '#c0c0c0', '#808080', '#000000', '#ffa500', '#00ff7f', '#87cefa',              
                '#dda0dd', '#6495ed', '#ffc0cb', '#7fffd4', '#ffd700', '#dc143c'];


const margin = {top: 20, right: 20, bottom: 30, left: 400};
const width = 1200 - margin.left - margin.right
const height = 600 - margin.bottom - margin.top

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
//Read Data, convert numerical categories into floats
//Create the initial visualisation
function data_visuals(nest){

const yearSelect = document.getElementById("year");
// Get the currently selected value
const selectedYear = yearSelect.value;

var selectedYearElements = document.getElementsByClassName("selected_year");
for (var i = 0; i < selectedYearElements.length; i++) {
  selectedYearElements[i].innerHTML = selectedYear;
}

const statisticFieldset_stat = document.querySelector('.option_button_statistic fieldset');

// Loop through the input elements inside the fieldset
const inputs = statisticFieldset_stat.querySelectorAll('input');
let selectedValue;
for (const input of inputs) {
  if (input.checked) {
    selectedValue = input.value;
    break;
  }
}

var selected_stat_div = document.getElementsByClassName("word_statistic");
if (selectedValue === "Mean") {
    for (var i = 0; i < selected_stat_div.length; i++) {
        selected_stat_div[i].innerHTML = `on average,`;
      }
  } else if (selectedValue === "Total") {
    for (var i = 0; i < selected_stat_div.length; i++) {
        selected_stat_div[i].innerHTML = `in total,`;
      }
  }
  


// const dataset = [];
dataset = nest.map(({key, value}, i) => ({
    Name: key,
    Message: selectedValue === "Total" ? value.Message_tot : value.Message_tot,
    Words: selectedValue === "Total" ? value.Words_tot : value.Words_mean,
    Haha: selectedValue === "Total" ? value.Haha_tot : value.Haha_mean,
    Quest: selectedValue === "Total" ? value.Quest_tot : value.Quest_mean,
    Morning: selectedValue === "Total" ? value.Morning_tot : value.Morning_mean,
    Night: selectedValue === "Total" ? value.Night_tot : value.Night_mean,
    Emoji: selectedValue === "Total" ? value.Emoji_tot : value.Emoji_mean,
    Laugh: selectedValue === "Total" ? value.Laugh_tot : value.Laugh_mean,
    Heart: selectedValue === "Total" ? value.Heart_tot : value.Heart_mean,
    Color: colors[i]
}));

console.log(dataset);

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
removeElementsByClass("intro_text");
removeElementsByClass("container");
removeElementsByClass("loader");
var loading = document.getElementById("loading");
var overlay = document.getElementById("overlay");
loading.remove();
overlay.remove();

const sections = document.getElementById("graphic");
sections.style.display = "inline";

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([height, 0]);

// Select the svg element and append a 'g' element
const svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

setTimeout(draw_img(), 100)

async function waitTwoSeconds() {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

function mouseOver(d, i){
    d3.select(this)
                .transition('mouseover').duration(100)
                .attr('opacity', 0.5)
                .attr('stroke-width', 2)
        
    d3.select('#tooltip')
        .style('left', (d3.event.pageX + 10)+ 'px')
        .style('top', (d3.event.pageY - 25) + 'px')
        .style('display', 'inline-block')
        .html(`<strong>Name:</strong> ${d.Name[0] + d.Name.slice(1,).toLowerCase()} 
            <br> <strong>Aantal:</strong> ${d3.format(",.2f")(d.Berichten)}`)
}
function mouseOut(d, i){
    d3.select('#tooltip')
        .style('display', 'none')

    d3.select(this)
        .transition('mouseout').duration(100)
        .attr('opacity', 1)
        .attr('stroke-width', 0)
    }

function clear_img(){
    // Select the image element and remove it from the DOM
  d3.select("image").remove();
}


function draw_img() {
    clearInterval(interval);
    draw_init();
  
    // Select the svg element and append an image element
    const image = svg.append("image")
      .attr("xlink:href", "Whatsapp_wordcloud.jpg")
      .attr("x", 0)
      .attr("y", 0);
  
    // Set the width and height attributes to specify the size of the image
    image.attr("width", 500)
      .attr("height", 500);
  
    // Select the image element and append a clipPath element
    const clipPath = svg.append("clipPath")
      .attr("id", "clip-circle");
  
    // Append a rectangle element with rounded corners to the clipPath element
    clipPath.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 500)
      .attr("height", 500)
      .attr("rx", 50)
      .attr("ry", 50);
  
    // Set the clip-path attribute of the image element to the ID of the clipPath element
    image.attr("clip-path", "url(#clip-circle)");
  }
function draw_init(){
    clear_img(); 
    svg.selectAll(".bar").remove();
    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();
    // Scale the range of the data
    x.domain([0, d3.max(dataset, d => d.Berichten)]);
    y.domain(dataset.map(d => d.Name)).padding(0.1);

    // Append the bars
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", d => y(d.Name))
        .attr("width", d => x(d.Berichten))
        .attr("fill", d => d.Color)
        .attr("opacity", 0);

    // Add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .attr("opacity", 0)
        .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("opacity", 0)
        .call(d3.axisLeft(y));

}
function styleAxisLabels(){
    svg.selectAll(".x.axis")
      .style("font-family", "Spectral")
      .style("font-size", "20px");
  
    svg.selectAll(".y.axis")
      .style("font-family", "Spectral")
      .style("font-size", "20px");
  }
function draw_plot(property){
    clear_img(); 
    // Set a timeout to stop the loop after 50 iterations
    clearInterval(interval);
    clearTimeout(trans_timeout);

    maxWords = 0;
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i][property] > maxWords) {
        maxWords = dataset[i][property];
        maxName = dataset[i].Name;
        }
    }
    var div = document.getElementById(property)
    div.innerHTML = maxName;

    dataset.sort((a, b) => a[property] - b[property]);
    // Scale the range of the data
    x.domain([0, d3.max(dataset, d => d[property])]);
    y.domain(dataset.map(d => d.Name)).padding(0.1);

    // Select the bars and apply a transition effect
    svg.selectAll(".bar")
      .data(dataset)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", d => y(d.Name))
      .attr("opacity", 1)
    .attr("width", d => x(d[property]))
    .attr("fill", d => d.Color);

    // Update the x Axis
    svg.selectAll(".x.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisBottom(x));

    // Update the y Axis
    svg.selectAll(".y.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisLeft(y));
    
    styleAxisLabels();

        function mouseOver(d, i){
            let format = d[property] < 2 ? ",.2f" : ",.0f";

            d3.select(this)
                .transition('mouseover')
                .duration(100)
                .attr('opacity', 0.5)
                .attr('stroke-width', 2)
                
            d3.select('#tooltip')
                .style('left', (d3.event.pageX + 10)+ 'px')
                .style('top', (d3.event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(
                    `<strong>Name:</strong> ${d.Name[0] +
                      d.Name.slice(1).toLowerCase()} 
                      <br> <strong>Aantal:</strong> ${d3.format(format)(d[property])}`
                  );
                // .html(`<strong>Name:</strong> ${d.Name[0] + d.Name.slice(1,).toLowerCase()} 
                //     <br> <strong>Aantal:</strong> ${d3.format(",.0f")(d[property])}`)
        }
    
    // Add mouseover and mouseout events for all circles
    // Changes opacity and adds border
    svg.selectAll('rect')
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
}
function draw_trans(property){
    clear_img(); 

    function trans_bar_low(){
        dataset.sort((a, b) => b[property] - a[property]);
        
        // Scale the range of the data
        x.domain([0, d3.max(dataset, d => d[property])]);
        y.domain(dataset.map(d => d.Name)).padding(0.1);    
        
        svg.selectAll(".bar")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", d => y(d.Name))
        .attr("width", d => x(d[property] / 100))
        .attr("opacity", 1)
        .attr("fill", d => d.Color);

        // Update the y Axis
        svg.selectAll(".y.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisLeft(y));
            
        // Update the x Axis
        svg.selectAll(".x.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisBottom(x));
    }
    // Select the bars and apply a transition effect
    function trans_bar_high(){
        dataset.sort((a, b) => a[property] - b[property]);
        // Scale the range of the data
        x.domain([0, d3.max(dataset, d => d[property])]);
        y.domain(dataset.map(d => d.Name)).padding(0.1);

        svg.selectAll(".bar")
        .data(dataset)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", d => y(d.Name))
        .attr("width", d => x(d[property] * 1.5))
        .attr("opacity", 1)
        .attr("fill", d => d.Color);

        // Update the y Axis
        svg.selectAll(".y.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisLeft(y));
            
        // Update the x Axis
        svg.selectAll(".x.axis")
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .call(d3.axisBottom(x));
    }

    // Define a function to be called on each iteration of the loop
    function loop() {
    // Call the trans_bar_high() function
    trans_bar_low();
    
    // Call the trans_bar_low() function with a delay of 500 milliseconds
    trans_timeout = setTimeout(trans_bar_high, 2000);
    }
    loop();
    // Use the setInterval() function to call the loop() function at regular intervals
    interval = setInterval(loop, 4000);

    // Set a timeout to stop the loop after 50 iterations
    setTimeout(function() {
    clearInterval(interval);
    }, 50000);
}

//Array of all the graph functions
//Will be called from the scroller functional
let activationFunctions = [
    draw_img,
    draw_img,
    function() { draw_plot("Message"); },
    function() { draw_trans("Message"); },
    function() { draw_plot("Emoji"); },
    function() { draw_trans("Emoji"); },
    function() { draw_plot("Night"); },
    function() { draw_trans("Night"); },
    function() { draw_plot("Morning"); },
    function() { draw_trans("Morning"); },
    function() { draw_plot("Quest"); },
    function() { draw_trans("Quest"); },
    function() { draw_plot("Heart"); },
    function() { draw_trans("Heart"); },
    function() { draw_plot("Laugh"); },
    function() { draw_trans("Laugh"); },
    function() { draw_plot("Words"); },
    function() { draw_trans("Words"); },
    function() { draw_plot("Haha"); },
    function() { draw_trans("Haha"); },
]

//All the scrolling function
//Will draw a new graph based on the index provided by the scroll


let scroll = scroller()
    .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){
    d3.selectAll('.step')
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})
}