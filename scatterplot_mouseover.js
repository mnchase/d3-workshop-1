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

function drawName(group) {
    group.append('text')
    .data(this)
    .enter()
    .attr('x', this.cx)
    .attr('y', this.cy)
    .text('Hello!')

}

function drawDots(svg,objects,labels,domains) {
    const x_min = domains['x_domain']['x_min'];
    const x_max = domains['x_domain']['x_max'];
    const y_min = domains['y_domain']['y_min'];
    const y_max = domains['y_domain']['y_max'];

    const x_ax_trans = function(num) {
    	return (num-x_min)/(x_max-x_min)*graph_width
    };
    const y_ax_trans = function(num) {
    	return (1-(num-y_min)/(y_max-y_min))*graph_height
    };

    let group = svg.append('g')
		    .attr('transform', 'translate('+margin.left+', '+margin.top+')');
    let info = group.append('g')
		    .attr('transform', 'translate('+margin.left+', '+margin.top+')')
		    .attr('class', 'info')
		    .append('text')
		    .style('opacity', 0)
		

    group.selectAll('dot')
	  .data(objects)
	  .enter()
	  .append('circle')
	  .attr('cx', function(d,i){return x_ax_trans(d[labels['x']])})
	  .attr('cy', function(d,i){return y_ax_trans(d[labels['y']])})
	  .attr('r', 5)
	  .attr('class', 'dot')
	  .on('mouseover',function(d, i) {
		d3.select(this)
			.transition()
			.duration('50')
			.attr('fill-opacity', 1)

		info.transition()
			.duration(50)
			.style('opacity', 1)

		info.attr('x', d.cx)
			.attr('y', d.cy)

		info.append('tspan')
			.text(labels['x']+': '+d[labels['x']]);
    		info.append('tspan')
			.attr('dy', '1.2em')
			.text(labels['y']+': '+d[labels['y']]);
	  })
      	  .on('mouseout',function (d, i) {
        	d3.select(this)
          		.transition()
          		.duration(50)
			.style('fill-opacity', 0.25)

		info.transition()
			.duration(50)
			.style('opacity', 0)
      	  })
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
/* for stats.csv (url: https://baseballsavant.mlb.com/leaderboard/custom?year=2023&type=batter&filter=&min=q&selections=player_age%2Cpa%2Chome_run%2Ck_percent%2Cbb_percent%2Cb_rbi%2Cwoba%2Cxwoba%2Csweet_spot_percent%2Cbarrel_batted_rate%2Chard_hit_percent%2Cavg_best_speed%2Cavg_hyper_speed%2Cwhiff_percent%2Cswing_percent&chart=false&x=player_age&y=player_age&r=no&chartType=beeswarm&sort=xwoba&sortDir=desc) */
labels = {'title':'25 year old MLB Players:','x':'home_run','y':'b_rbi'};
domains = {'x_domain':{'x_min':0,'x_max':70,'x_style':(d) => {return d}},'y_domain':{'y_min':0,'y_max':100,'y_style':(d) => {return d}}};
sieve = {'label':'player_age','type':'25'};

//for museums_edited.csv
const abbreviateNumber = function(num) {
    if (num / 1e9 >= 1) 
        return '$' + (num/1e9) + 'B';
    else if (num / 1e6 >= 1) 
        return '$' + (num/1e6) + 'M';
    else 
        return '$' + num;
};
labels = {'title':'Natural History Museums:','x':'Income','y':'Revenue'};
domains = {'x_domain':{'x_min':-1e8,'x_max':1.8e9,'x_style':abbreviateNumber},'y_domain':{'y_min':-1e8,'y_max':1.2e9,'y_style':abbreviateNumber}};
sieve = {'label':'Museum Type','type':'NATURAL HISTORY MUSEUM'};

main('data/museums_edited.csv',labels,domains,sieve);