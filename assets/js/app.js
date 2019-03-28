// @TODO: YOUR CODE HERE!
function makeResponsive() {

    var svgArea = d3.select('#scatter').select('svg');
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
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

    d3.csv('data/data.csv')
        .then(function(err, healthData) {
            if (err) throw err;
            
            healthData.forEach(function(data) {
                data.poverty = parseFloat(data.poverty);
                data.obesity = parseFloat(data.healthcare);
            });

            var xLinearScale = d3.scaleLinear()
                .domain([0, d3.max(healthData, datum => datum.poverty)])
                .range([0, width]);
            
            var yLinearScale = d3.scaleLinear()
                .domain([0, d3.max(healthData, datum => datum.healthcare)])
                .range([0, width]);
            
            var xAxis = d3.axisBottom(xLinearScale).tickFormat(d3.format('.0%'));
            var yAxis = d3.axisLeft(yLinearScale).tickFormat(d3.format('.0%'));

        })


}

makeResponsive();

d3.select(window).on('resize', makeResponsive);