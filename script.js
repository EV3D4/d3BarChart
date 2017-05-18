$(document).ready(function() {

  $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json) {

    var returnNum = json.data.map(function(d, i) {
      return [
        (json.data[i][1])

      ]

    });
    var dataset = [].concat.apply([], returnNum);

    margin = {
      top:10,
      right: $(".divCard").width()*.05,
      bottom: $(".divCard").height()*.10,
      left: $(".divCard").width()*.03
    }

    var w = $(".divCard").width() - margin.left - margin.right,
        h = $(".divCard").height() - margin.top - margin.bottom;

    var xScale = d3.scaleTime().range([0, w]);
    var yScale = d3.scaleLinear().range([h, 0]);

      xScale.domain([new Date('1947-1-1'), (new Date('2020-1-1'))]);
      yScale.domain([0,20]);

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


      var svg = d3
        .select(".divCard")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (w / (dataset.length+10));
      })
      .attr("height", function(d) {
        return d / (21);
      })
      .attr("y", function(d) {
        return h - d / (21)
      })
      .attr("width", w  /(dataset.length+65))
      .attr("fill", "#4682b4")
      .attr("class", "bar")

          .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("$" + d + " million")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
            })
      .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });



  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate("+0+"," + h + ")")
      .call(d3.axisBottom(xScale))
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px");

  svg.append("g")
       .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisLeft(yScale))
          .attr("font-family", "sans-serif")
     .attr("font-size", "12px");

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("x", -90)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", "18px")
      .style("fill", "#ff3232 ")
      .attr("font-family", "sans-serif")
      .text("GDP [Billions of Dollars]");

    svg
        .append("text")
        .attr("y", -5)
        .attr("x", w / 2.25)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("font-size", "2vw")
        .style("fill", "black")
        .attr("font-family", "sans-serif")
        .text("Gross Domestic Product [USA]");

  });

});
