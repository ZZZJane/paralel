var width = 700,
    height = 700,
    padding = {left:20,right:20};
var color = d3.scaleOrdinal(d3.schemeCategory20);
    d3.json("test.json",function(json){
        let x1 = new Set() ,
            x2 = new Set(),
            x3 = new Set(),
            x4 = new Set();
        var head = [];
        var tbody = json.tbody;
        var thead = json.thead;
        thead.forEach(function(data){
            head.push(data);
        })
        tbody.forEach(function(data){
            x1.add(data[0]);
            x2.add(data[1]);
            x3.add(data[2]);
            x4.add(data[3]);
        })
        var svg = d3.select("body").append("svg")
            .attr("width",width)
            .attr("height",height)
        function scalerange(arr){
            var b = [];
            for(let i = 0;i<arr.size;i++){
                b.push(30*i);

            }
            return b;

        }
        var scale1 = d3.scaleOrdinal()
            .domain(Array.from(x1))
            .range(scalerange(x1))
        var scale2 = d3.scaleOrdinal()
            .domain(Array.from(x2))
            .range(scalerange(x2))
        var scale3 = d3.scaleOrdinal()
            .domain(Array.from(x3))
            .range(scalerange(x3))
        var scale4 = d3.scaleOrdinal()
            .domain(Array.from(x4))
            .range(scalerange(x4))
        var axis1 = d3.axisLeft()
            .scale(scale1)
            .ticks(5)
        var axis2 = d3.axisLeft()
            .scale(scale2)
            .ticks(5)
        var axis3 = d3.axisRight()
            .scale(scale3)
            .ticks(5)
        var axis4 = d3.axisRight()
            .scale(scale4)
            .ticks(5)


        svg.append("g").call(axis1).attr("transform",function(d,i) {
            return "translate(" + (40+160*i) + ")"; })
            .attr("class", "trait")
            .data(['z'])
        svg.append("g").call(axis2).attr("transform",function(d,i) {
            return "translate(200)"; })
            .attr("class", "trait")
        svg.append("g").call(axis3).attr("transform",function(d,i) {
            return "translate(360)"; })
            .attr("class", "trait")
        svg.append("g").call(axis4).attr("transform",function(d,i) {
            return "translate(520)"; })
            .attr("class", "trait")
            .append("svg:text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("y", 12)
            .text(String);
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })

        tbody.forEach(function(data){
            svg.append('svg:path')
                .attr('d', line([
                    {x:40, y:scale1(data[0].scale1)},
                    {x:200, y:scale2(data[1].scale2)},
                    {x:360, y:scale3(data[2].scale3)},
                    {x:520,y:scale4(data[3].scale4)}
                ]))
                .attr('stroke', function(d,i) { return color(i)})
                .attr('fill', 'none');
        })
        var lines = svg.selectAll("path.node")
            .data(tbody, function(d) { return d.name })
            .enter().append("path")
            .attr("class", "node")
            .style("stroke", function(d) { return color(d.group); });

       console.log(json);
       console.log(x1);
       console.log(head);
});

