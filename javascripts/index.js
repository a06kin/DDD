var width = $("div#main").width(),
    height = 500;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var color = d3.scale.category20c();

var partition = d3.layout.partition()
    .children(function(d) { return isNaN(d.value) ? d3.entries(d.value) : null; })
    .value(function(d) { return d.value; });

var svg = d3.select("div#main").append("svg")
    .attr("width", width)
    .attr("height", height);

var rect = svg.selectAll("rect");

d3.json("readme.json", function(error, root) {
  rect = rect
      .data(partition(d3.entries(root)[0]))
      .enter().append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", function(d) { return x(d.dx); })
      .attr("height", function(d) { return y(d.dy); })
      .attr("fill", function(d) { return color((d.children ? d : d.parent).key); })
      .on("click", clicked)
  	  .on("mouseover", mOver);
});

function clicked(d) {
  x.domain([d.x, d.x + d.dx]);
  y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);

  rect.transition()
      .duration(750)
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
      .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
}

function mOver(d) {
	console.log(d);
}