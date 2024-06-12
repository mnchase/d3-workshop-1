
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
}

d3.json('data/jerry_codes.json').then(makeJerry)