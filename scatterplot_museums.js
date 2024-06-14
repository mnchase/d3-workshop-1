const container_id = 'NaturalHistoryMuseums';
const width = 600, height = 400;
const margin = {
    top: 50,
    bottom: 50,
    left: 60,
    right: 50
}

const title_x_pos = margin.left + (width-(margin.left+margin.right))/2;
const title_y_pos = margin.top;

const x_ax_x_pos = margin.left + (width-(margin.left+margin.right))/2;
const x_ax_y_pos = height - margin.bottom/2;

const y_ax_x_pos = margin.left/2;
const y_ax_y_pos = margin.top + (height-(margin.top+margin.bottom))/2;

const graph_width = width - (margin.left + margin.right)
const graph_height = height - (margin.top + margin.bottom)

x_min = -1e8
x_max = 1.8e9
y_min = -1e8
y_max = 1.2e9

const xScale = d3.scaleLinear().domain([x_min, x_max]).range([0, graph_width]);

const yScale = d3.scaleLinear().domain([y_min, y_max]).range([graph_height, 0]);

const abbreviateNumber = function(num) {
    if (num / 1e9 >= 1) 
        return '$' + (num/1e9) + 'B';
    else if (num / 1e6 >= 1) 
        return '$' + (num/1e6) + 'M';
    else 
        return '$' + num;
}

const x_ax_trans = function(num) {
    return (num-x_min)/(x_max-x_min)*graph_width
}

const y_ax_trans = function(num) {
    return (1-(num-y_min)/(y_max-y_min))*graph_height
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

function drawDots(svg, museums) {
    let group = svg.append('g')
		    .attr('transform', 'translate('+margin.left+','+margin.top+')');
    group.selectAll('dot')
	  .data(museums)
	  .enter()
	  .append('circle')
	  .attr('cx', function(d,i){return x_ax_trans(d['Income'])})
	  .attr('cy', function(d,i){return y_ax_trans(d['Revenue'])})
	  .attr('r', 5)
	  .attr('class', 'dot');
}

function filterMuseums(museums){
    return museums.filter(function(museum) {
			    return museum["Museum Type"] == "NATURAL HISTORY MUSEUM"})
}

function drawScatterPlot(data) {
    let svg = d3.select('#' + container_id)
                .append('svg')
		.attr('width', width)
		.attr('height', height);

    drawDots(svg, data)

    drawXAxis(svg)
    drawYAxis(svg)
    let title_group = svg.append('g')
			.attr('class', 'title')
			.attr('transform', 'translate('+title_x_pos+','+title_y_pos+')')
			.append('text');
    title_group.append('tspan')
		.attr('x', 0)
		.attr('dy', '-0em')
		.text('Natural History Museums:');
    title_group.append('tspan')
		.attr('x', 0)
		.attr('dy', '1.2em')
		.text('Income vs Revenue');
    svg.append('text')
	.attr('class', 'axis-label')
	.attr('x', x_ax_x_pos)
	.attr('y', (height+x_ax_y_pos)/2)
	.text('Income');
    svg.append('text')
	.attr('class', 'axis-label')
	.attr('transform', 'rotate(270,'+y_ax_x_pos+','+y_ax_y_pos+') translate(0,-'+y_ax_x_pos/2+')')
	.attr('x', y_ax_x_pos)
	.attr('y', y_ax_y_pos)
	.text('Revenue');

}

function main(){
    d3.csv('data/museums_edited.csv')
	.then((d) => {
		return filterMuseums(d)
	})
	.then(drawScatterPlot);
}

main();