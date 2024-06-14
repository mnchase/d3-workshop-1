const container_id = 'scatterplot';
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

function drawTitle(svg,labels) {
    let title_group = svg.append('g')
			.attr('class', 'title')
			.attr('transform', 'translate('+title_x_pos+','+title_y_pos+')')
			.append('text');
    title_group.append('tspan')
		.attr('x', 0)
		.attr('dy', '-0.6em')
		.text(labels['title']);
    title_group.append('tspan')
		.attr('x', 0)
		.attr('dy', '1.2em')
		.text(labels['x']+' vs '+labels['y']);
}

function drawXAxis(svg,x_domain) {
    const xScale = d3.scaleLinear().domain([x_domain['x_min'], x_domain['x_max']]).range([0, graph_width]);
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')')
        .call(d3.axisBottom(xScale).ticks(width/60).tickFormat(x_domain['x_style']));
}

function drawYAxis(svg,y_domain) {
    const yScale = d3.scaleLinear().domain([y_domain['y_min'], y_domain['y_max']]).range([graph_height, 0]);
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(d3.axisLeft(yScale).ticks(height/60).tickFormat(y_domain['y_style']));
}

function drawXLabel(svg,ax_label) {
    svg.append('text')
	.attr('class', 'axis-label')
	.attr('x', x_ax_x_pos)
	.attr('y', (height+x_ax_y_pos)/2)
	.text(ax_label);
}

function drawYLabel(svg,ax_label) {
    svg.append('text')
	.attr('class', 'axis-label')
	.attr('transform', 'rotate(270,'+y_ax_x_pos+','+y_ax_y_pos+') translate(0,-'+y_ax_x_pos/2+')')
	.attr('x', y_ax_x_pos)
	.attr('y', y_ax_y_pos)
	.text(ax_label);
}

function drawDots(svg,objects,labels,domains) {
    const x_min = domains['x_domain']['x_min'];
    const x_max = domains['x_domain']['x_max'];
    const y_min = domains['y_domain']['y_min'];
    const y_max = domains['y_domain']['y_max'];
    const x_ax_trans = function(num) {
    	return (num-x_min)/(x_max-x_min)*graph_width
    }

    const y_ax_trans = function(num) {
    	return (1-(num-y_min)/(y_max-y_min))*graph_height
    }
    let group = svg.append('g')
		    .attr('transform', 'translate('+margin.left+','+margin.top+')');
    group.selectAll('dot')
	  .data(objects)
	  .enter()
	  .append('circle')
	  .attr('cx', function(d,i){return x_ax_trans(d[labels['x']])})
	  .attr('cy', function(d,i){return y_ax_trans(d[labels['y']])})
	  .attr('r', 5)
	  .attr('class', 'dot');
}

function filterObjects(objects,sieve){
    return objects.filter(function(object) {
			    return object[sieve['label']] == sieve['type']})
}

function drawScatterPlot(data,labels,domains) {
    let svg = d3.select('#' + container_id)
                .append('svg')
		.attr('width', width)
		.attr('height', height);

    drawDots(svg,data,labels,domains)
    drawXAxis(svg,domains['x_domain'])
    drawYAxis(svg,domains['y_domain'])
    drawTitle(svg,labels)
    drawXLabel(svg,labels['x'])
    drawYLabel(svg,labels['y'])
}

function main(file,labels,domains,sieve=''){
    d3.csv(file)
	.then((d) => {
		if(sieve=='') {
			return d
		}
		else {
			return filterObjects(d,sieve)
		}
	})
	.then((d) => {
		drawScatterPlot(d,labels,domains)
	});
}

labels = {'title':'25 year old MLB Players:','x':'home_run','y':'b_rbi'};
domains = {'x_domain':{'x_min':0,'x_max':50,'x_style':(d) => {return d}},'y_domain':{'y_min':0,'y_max':120,'y_style':(d) => {return d}}};
sieve = {'label':'player_age','type':'25'};

main('data/stats.csv',labels,domains,sieve);