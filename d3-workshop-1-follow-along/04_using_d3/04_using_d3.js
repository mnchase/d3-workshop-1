let flowers = [
    "Hyacinth",
    "Iris",
    "Bleeding Hearts",
    "Lilacs"
];

let rect_data = [
    { width: 80, height: 80, x: 80, y: 40, color: "purple"},
    { width: 40, height: 40, x: 100, y: 60, color: "yellow"}
];

d3.selectAll('.first-circle')
	.attr('r', 10)
	.attr('cx', 100)
	.attr('cy', 100)
	.style('fill', 'pink');

d3.selectAll('p')
	.style('color', 'red')
let group = d3.select('svg')
		.append('g')
		.attr('transform', 'translate(40,30) scale(1.5,1.5) rotate(60,120,180)');
	group
		.selectAll('rect')
		.data(rect_data)
		.enter()
		.append('rect')
		.attr('x', function(d,i){return d.x})
		.attr('y', function(d,i){return d.y})
		.attr('height', function(d,i){return d.height})
		.attr('width', function(d,i){return d.width})
		.style('fill', function(d,i){return d.color});

