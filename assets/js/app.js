// @TODO: YOUR CODE HERE!
function makeResponsive() {

    var svgArea = d3.select('#scatter').select('svg');
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        right: 25,
        bottom: 50,
        left: 50
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3
        .select('#scatter')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    d3.csv('../data.csv')
        .then(function(healthData) {
            
            healthData.forEach(function(data) {
                data.poverty = parseFloat(data.poverty)/100;
                data.healthcare = parseFloat(data.healthcare)/100;
                // data.abbr = data.abbr;
            });

            var xLinearScale = d3.scaleLinear()
                .domain([d3.min(healthData, data => data.poverty) * .90, d3.max(healthData, data => data.poverty) * 1.05])
                .range([0, width]);
            
            var yLinearScale = d3.scaleLinear()
                .domain([d3.min(healthData, data => data.healthcare) * .80, d3.max(healthData, data => data.healthcare) * 1.05])
                .range([height, 0]);
            
            var xAxis = d3.axisBottom(xLinearScale).ticks(7).tickFormat(d3.format('.0%'));
            var yAxis = d3.axisLeft(yLinearScale).tickFormat(d3.format('.0%'));

            chartGroup.append('g')
                .attr('transform', `translate(0, ${height})`)
                .classed('x-axis', true)
                .call(xAxis);
            
            chartGroup.append('g')
                .classed('y-axis', true)
                .call(yAxis);

            var circlesGroup = chartGroup.selectAll('circle')
                .data(healthData)
                .enter()
                .append('circle')
                .attr('cx', data => xLinearScale(data.poverty))
                .attr('cy', data => yLinearScale(data.healthcare))
                .attr('r', 14)
                .attr('fill', 'rgb(66,215,244)')
                .attr('opacity', .7);
                       
            var text = chartGroup.selectAll('tspan')
                .data(healthData)
                .enter()
                .append('text')
                .text(data => data.abbr)
                .attr('x', data => xLinearScale(data.poverty))
                .attr('y', data => yLinearScale(data.healthcare))
                .style('font-size', 10)
                .style('fill', 'white')
                .style('font-weight', 'bold')
                .style('text-anchor', 'middle');
            

            


        });


}

makeResponsive();

d3.select(window).on('resize', makeResponsive);