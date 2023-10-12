
// **** Your JavaScript code goes here ****
d3.csv("./baseball_hr_leaders_2017.csv").then(function(dataset) {

    d3.select("#homerun-leaders")
        .selectAll("p")
        .data(dataset)
        .enter()
        .append("p")
        .style('color', function(d) {
            return d.rank <= 3 ? 'green' : 'black'
        })
        .text(function(d) {
            return d.rank + ". " + d.name + " with " + d.homeruns + " home runs"
        })

    const rows = d3.select("#homerun-table-tbody")
        .selectAll("tr")
        .data(dataset)
        .enter()
        .append("tr")
        rows.append("td").text(function(d) {
            return d.rank
        }).attr("class", "td-rank")
        rows.append("td").text(function(d) {
            return d.name
        })
        rows.append("td").text(function(d) {
            return d.homeruns
        }).attr("class", "td-homerun")

});


