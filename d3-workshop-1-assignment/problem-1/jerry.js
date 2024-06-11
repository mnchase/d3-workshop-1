
function makeJerry(jerry){
    let width = 200, height = 200
    
    // Create an svg element in the DOM to hold Jerry 
    let svg = d3.select('#jerry')
                .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    // Define width and height of a square representing a Jerry pixel
    // You may want to use these values in your code below
    let square_width  = width/17,
        square_height = height/17              

    jerry.forEach((row,i) => {
	svg.selectAll('row')
		.data(row)
		.enter()
		.append('rect')
		.attr('height', square_height)
		.attr('width', square_width)
		.attr('x', function(elem,j){return j*square_width})
		.attr('y', function(elem,j){return i*square_height})
		.style('fill', function(elem,j){return elem})
    })
		// Select all <rect> elements in the DOM. Note: This is valid even if there are no <rect> elements yet.
            /* TODO: 
                1. Bind the row array to this selection.
                2. Use enter() and append() to create a square for each of the 17 pixels in the row array
                3. Set the necessary attributes for the squares
                    Hint: These attributes should use square_width and/or square_height
                    Hint: The x and y coordinates should depend on the corresponding Jerry pixel's i and j values respectively.
                4. Style the squares
                    Hint: row is an array of rgb strings, which are valid values for the fill property in css.
                    */
    
}

d3.json('data/jerry_codes.json').then(makeJerry)