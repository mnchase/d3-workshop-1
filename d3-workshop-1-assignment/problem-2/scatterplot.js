const container_id = ''; // TODO: Set container_id to the id you gave to the div in problem-2/index.html 
const width = 600, height = 400;
const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
}

const title_x_position = margin.left + (width-(margin.left+margin.right))/2;
const title_y_position = margin.top;

const x_axis_x_position = margin.left + (width-(margin.left+margin.right))/2;
const x_axis_y_position = height - margin.bottom/2;

const y_axis_x_position = margin.left/2;
const y_axis_y_position = margin.top + (height-(margin.top+margin.bottom))/2;


const xScale = d3.scaleLinear().domain([-1e8, 1.8e9]).range([0, width - (margin.left + margin.right)]);

const yScale = d3.scaleLinear().domain([-1e8, 1.2e9]).range([height - (margin.top + margin.bottom), 0]);

const abbreviateNumber = function(num) {
    if (num / 1e9 >= 1) 
        return '$' + (num/1e9) + 'B';
    else if (num / 1e6 >= 1) 
        return '$' + (num/1e6) + 'M';
    else 
        return '$' + num;
}

function drawXAxis(svg) {
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')')
        .call(d3.axisBottom(xScale).tickFormat(abbreviateNumber));
}

function drawYAxis(svg) {
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(d3.axisLeft(yScale).tickFormat(abbreviateNumber));
}

function drawDots(data) {
    /* TODO:
        1. Append a group to the svg
        2. Translate this group margin.left pixels in the x direction and margin.top in the y direction
        3. Within this group, create a selection of all elements with class "dot"
        3. Bind the data array to the selection
        4. Use enter() and append() to create a dot for each of the elements in the data array
        5. Set the necessary attributes for the dots
            Hint: The scatter plot's x axis represents the museum's Income property 
            Hint: The scatter plot's y axis represents the museum's Revenue property
            Hint: The dots should all be the same size
        6. Set the dot class to "dot"                                                           */
}

function filterMuseums(d){
    /* TODO: Filter the data to only include natural history museums 
                Hint: the data has a "Museum Type" property                                     */
}

function drawScatterPlot(data) {
    let svg = d3.select('#' + container_id)
                .append('svg')
                    /* TODO: Set the width and height of the svg                                */
                    ;

    /* TODO: 
        1. Call the drawDots, drawXAxis, and drawYAxis function with the appropriate parameters
        2. Add a title to the visualization
            a. The title should have the class "title"
        3. Add x and y axis labels to the visualization
            a. The axis labels should have the class "axis-label"                               */

}

function main(){
    /* TODO: 
        1. Load the museums_edited.csv file from the data/ directory
        2. Filter the data 
        2. then call drawScatterPlot with the resulting data */
}

main();