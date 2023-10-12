// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}))

    .append('text') // Append text
    .attr('x', 360) // Adjust the x 
    .attr('y', 40) // Adjust the y 
    .text('MLB Season');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale))

    .append('text') // Append text
    .attr('transform', 'rotate(90)') // Rotate text
    .attr('x', 230) // Adjust the x position 
    .attr('y', 40) // Adjust the y position 
    .text('Home Runs (HR)');

svg.append('text') // Append text
    .attr('x', 250) // Adjust x position 
    .attr('y', 30) // Adjust the y position
    .text('Top 10 HR Leaders per MLB Season');
    
// **** Your JavaScript code goes here ****


d3.csv("./baseball_hr_leaders.csv").then(function(dataset) {
    
    var groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('transform', function(d) {
            var cx = scaleYear(d.year);
            var cy = scaleHomeruns(d.homeruns);
            return 'translate(' + cx + ',' + cy + ')';
        });

    
    groups.append('text')
        .text(function(d) {
            return d.name
        })
        .attr('dy', '-10px') 
        .attr('class', 'player-name'); 


    groups.append('circle')
        .attr('r', 2)
        .attr('class', function(d) {
            if (d.rank >= 1 && d.rank <=3) {
                return 'top-rank-circles'
            } else if (d.rank >= 9 && d.rank <= 10) {
                return 'bottom-rank-circles'
            } else {
                return 'circle'
            }
        });

    
})
