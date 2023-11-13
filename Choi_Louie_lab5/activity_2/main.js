// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category);
}

// Recall that when data is loaded into memory, numbers are loaded as Strings
// This function converts numbers into Strings during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// A map with arrays for each category of letter sets
var lettersMap = {
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOUY'.split(''),
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
};

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    letters = dataset;

    frequencyScale = d3.scaleLinear()
        .domain([0, d3.max(letters, function(d) { return d.frequency; })])
        .range([0, chartWidth]);

    // **** Your JavaScript code goes here ****

    // Update the chart for all letters to initialize
    titleAndScale();
    updateChart('all-letters');
});

function titleAndScale() {
    var xScale = d3.scaleLinear()
    .domain([0, 13])
    .range([0, chartWidth]);

    var xAxisBottom = d3.axisBottom(xScale)
        .tickFormat(function(d) {
            return d + "%";
        })
        .ticks(6); 

    chartG.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + (chartHeight - 5) +')')
        .call(xAxisBottom);

    var xAxisTop = d3.axisTop(xScale)
        .tickFormat(function(d) {
            return d + "%";
        })
        .ticks(6);

    chartG.append('g')
        .attr('class', 'x-axis')
        .call(xAxisTop)
        .attr('transform', 'translate(0, -5)');

    chartG.append('text')
        .attr('class', 'chart-title')
        .attr('x', chartWidth / 2)
        .attr('y', -30)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Letter Frequency (%)');
}

function updateChart(filterKey) {
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0;
    });

    // **** Draw and Update your chart here ****
    titleAndScale();

    var bars = chartG.selectAll('.bar')
        .data(filteredLetters);

    var barsEnter = bars.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) {
            return filteredLetters.indexOf(d) * barBand;
        })
        .attr('height', barHeight)
        .merge(bars.selectAll('bar'))
    bars.merge(barsEnter)
        .attr('width', function(d) {
            return frequencyScale(d.frequency);
        });

    var labels = chartG.selectAll('.label')
        .data(filteredLetters)

    var labelsEnter = labels.enter()
        .append('text')
        .attr('class', 'label')
        .attr('y', function(d) {
            return (filteredLetters.indexOf(d) + 0.7) * barBand;
        })
        .attr('x', -20);

    labels.merge(labelsEnter)
        .text(function(d) {
            return d.letter;
        });

    bars.exit()
        .remove();

    labels.exit()
        .remove();
}

// Remember code outside of the data callback function will run before the data loads