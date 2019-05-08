function runCarto(action) {
		var cheapBtn = document.getElementById('rb_cheapcarto');
		var monthBtn = document.getElementById('rb_jancarto');
		shiftcarto(action, cheapBtn.checked, monthBtn.checked);
};

function cartogram() {

w = 960;
h = 500;

var svg = d3.select("div#carto").append("svg")

    .attr("width", w)

    .attr("height", h);



d3.json("cartdat.json", function(json) {

	  var xramp=d3.scale.linear().domain([-8.5,43]).range([0,1]);

	  var yramp=d3.scale.linear().domain([55.5,22.5]).range([0,1]);

	  var colorramp=d3.scale.linear().domain([0,100,200]).range(["red","yellow","blue"]);

	  var sites = json;

	  cartoSetCenter = 2;

	  restoreCarto = true;

		

		d3.json("med.json", function(json) {

			  var med = json;

			  var lineFn = d3.svg.line()

			  .x(function(d) { return (xramp(d.xcoord) * w)})

			  .y(function(d) { return (yramp(d.ycoord) * h)})

			  .interpolate("cardinal")

			  ;

			  svg.append("path")

				.style("fill", "black")

				.style("stroke", "black")

				.style("stroke-width", 1)

				.style("opacity", .1)

				.attr("d", lineFn(med))

		})

	  svg.selectAll("circle.dccircle")

	  .data([1.0, .9, .8, .7, .6, .5, .4, .3, .2, .1])

	  .enter().append("circle")		

	  .attr("cx", 480)

	  .attr("cy", 250)

	  .attr("r", function(d) { return (d * 960)})



	  .attr("class", "dccircle")

	  .style("stroke", "gray")

	  .style("fill", "white")

	  .style("opacity", 0);



		  svg.selectAll("rect.legendrects")

		  .data([0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200])

		  .enter().append("rect")		

		  .attr("x", function(d) { return (d + 20)})

		  .attr("y", 380)

		  .attr("width", 20)

		  .attr("height", 10)

		  .attr("fill", function(d) { return (colorramp(d))})

		  .attr("class", "legendrects")

		  .style("opacity", 1)

		  ;

		  var colorramp=d3.scale.linear().domain([0,3,25]).range(["red","yellow","blue"]);		

	  svg.selectAll("rect.siterects")

	  .data(sites)

	  .enter().append("rect")		

	  .attr("x", function(d) { return (xramp(d.xcoord) * 960)})

	  .attr("y", function(d) { return (yramp(d.ycoord) * 500)})

	  .attr("width", function(d) { return ((d.scale < 90) ? d.scale / 20 : 8)})

	  .attr("height", function(d) { return ((d.scale < 90) ? d.scale / 20 : 8)})

	  .attr("fill", function(d) { return (colorramp(d.we_rom))})

	  .attr("class", "siterects")

	  .style("opacity", 1)

	  ;



	  var legendt = svg.selectAll("text.legendtext")

	  .data([0, 1.5, 3, 12, 25])

	  .enter().append("text")

	  .attr("x", function(d, i) { return ((i * 50) + 25)})

	  .attr("y", 375)

	  .attr("class", "legendtext")

	  .text(function(d, i) { return (i == 4) ? ("" + d + " denarii") : ("" + d)})

	  ;

	  var titletext = svg.selectAll("text.titletext")

	  .data([0])

	  .enter().append("text")

	  .attr("x", 25)

	  .attr("y", 355)

	  .attr("class", "titletext")

	  .text("Grain distance to Rome in Winter")

	  ;


	  var clearlabelt = svg.selectAll("text.clearbtn")

	  .data(["CLEAR LABELS","RESET LABELS"])

	  .enter().append("text")

	  .attr("x", 860)

	  .attr("y", function(d, i) { return (i * 20) + 20})

	  .attr("width", 100)

	  .attr("height", 100)

	  .style("stroke", "gray")

	  .text(function(d) { return d })

	  .attr("class", "clearbtn")

	  .on("click", clearlabels)

	  ;

	  

	  svg.selectAll("text.dclabel")

	  .data(sites)

	  .enter().append("text")

	  .attr("x", function(d) { return ((xramp(d.xcoord)  * 960) - 5)})

	  .attr("y", function(d) { return ((yramp(d.ycoord)  * 500) + 5)})

	  .text(function(d) { return d.name })

	  .attr("opacity", function(d) { return ((d.scale > 90) ? 100 : 0)})

	  .attr("class", "dclabel")

	  .attr("id", function(d, i) { return "dclabel_" + i})

	  .on("click", mouseclick)

	  ;

	  

	  var selectiontext = svg.selectAll("text.ringlabel")

	  .data([1.0, .9, .8, .7, .6, .5, .4, .3, .2, .1])

	  .enter().append("text")

	  .attr("x", function(d) { return ((d  * 960) + 480)})

	  .attr("y", 250)

	  .text(function(d) { return d})

	  .attr("class", "ringlabel")

	  .attr("opacity", 0);

	  ;

	  function mouseclick(d, i) {

		    if (d3.select(this).attr("opacity") > 0){

		    	d3.select(this).attr("opacity", 0)

		    }

		    else {

		    	d3.select(this).attr("opacity", 1)		    	

		    }

	  }

	  function clearlabels(d, i) {

		  if (i == 0) {

		  svg.selectAll("text.dclabel")

		  .data(sites)

		    .transition()

		    .duration(800)

   		  	.attr("opacity", 0)

		  ;

		  }

		  else {

			  svg.selectAll("text.dclabel")

			  .data(sites)

			    .transition()

			    .duration(800)

	   		  	.attr("opacity", function(d) { return ((d.scale > 90) ? 100 : 0)})

		  }

	  }

	  

}

); // d3

} //end cartogram10()



function shiftcarto(center, cheaptrue, jantrue) {

	var newTitleText = "";

	//now get segments and draw d3 graph

	var svg = d3.select("div#carto svg");

	if (cheaptrue == true) {

		var pathtype = "e";

		var ringtype = " denarii";		

		max = 25;

		mid = 3;
		
		newTitleText = "Grain distance to ";

	}

	else {

		var pathtype = "s";

		max = 60;

		mid = 10;

		var ringtype = " days";
		
		newTitleText = "Travel time to ";
	}

	if (jantrue == true) {

		var monthtype = "w";

	}

	else {

		var monthtype = "s";

	}

	if (center == 1) {

		center = cartoSetCenter;

		restoreCarto = true;

	}

	else if (center == 6) {

		center = cartoSetCenter;		

	}

	else {

		cartoSetCenter = center;

		restoreCarto = false;

		}

	

	if (center == 2) {

		var datapath = "" + monthtype + pathtype + "_rom";

		centerx = 12.49;

		centery = 41.89;

		newTitleText = newTitleText + "Rome in ";		

	}

	else if (center == 3) {

		var datapath = "" + monthtype + pathtype + "_con";

		centerx = 28.99;

		centery = 41.02;
		
		newTitleText = newTitleText + "Constantinopolis in ";		

	}

	else if (center == 4) {

		var datapath = "" + monthtype + pathtype + "_lon";

		centerx = -0.08;

		centery = 51.52;

		newTitleText = newTitleText + "Londinium in ";		
		
	}

	else if (center == 5) {

		var datapath = "" + monthtype + pathtype + "_ant";

		centerx = 36.17;

		centery = 36.21;

		newTitleText = newTitleText + "Antiochia in ";		

	}
	
	if (monthtype == "s") {
		newTitleText = newTitleText + "Summer";			
	}
	else {
		newTitleText = newTitleText + "Winter";						
	}

			var xramp=d3.scale.linear().domain([-8.5,43]).range([0,960]);

			  var yramp=d3.scale.linear().domain([55.5,22.5]).range([0,500]);

		  var colorramp=d3.scale.linear().domain([0,mid,max]).range(["red","yellow","blue"]);

		  var costramp=d3.scale.linear().domain([0,max]).range([0,1]);	  
		  
		  
		  svg.selectAll("text.titletext")

		  .transition()

		   .duration(3000)

		  .text(newTitleText)

		  ;




if (restoreCarto == true) {

		  svg.selectAll("rect.siterects")

		    .transition()

		    .duration(3000)

		  .attr("x", function(d) { return (xramp(d.xcoord))})

		  .attr("y", function (d) { return (yramp(d.ycoord))})

  		  .attr("fill", function(d) { return (colorramp(d[datapath]))})

		  .style("opacity", .9);



		  svg.selectAll("circle.dccircle")

		    .transition()

		    .duration(3000)

		  .style("opacity", 0)

		  ;

		  

		  svg.selectAll("text.dclabel")


		    .transition()

		    .duration(3000)

		  .attr("x", function(d) { return (xramp(d.xcoord)) - 5})

		  .attr("y", function(d) { return (yramp(d.ycoord)) + 5})



		  svg.selectAll("text.ringlabel")

		    .transition()

		    .duration(3000)

			  .style("opacity", 0)

		    ;

		  svg.selectAll("path")

		    .transition()

		    .duration(3000)

		    .style("opacity", .1)

		    ;

}

else {

		  svg.selectAll("rect.siterects")

		    .transition()

		    .duration(3000)

		  .attr("x", function(d) { return (findx(d[datapath],d.xcoord,d.ycoord,centerx,centery))})

		  .attr("y", function(d) { return (findy(d[datapath],d.xcoord,d.ycoord,centerx,centery))})

		  .attr("fill", function(d) { return (colorramp(d[datapath]))})

		  .style("opacity", .8)

		  ;



		  svg.selectAll("circle.dccircle")

		    .transition()

		    .duration(3000)

		  .style("opacity", 100)

		  ;

		  

		  svg.selectAll("text.dclabel")

		    .transition()

		    .duration(3000)

		  .attr("x", function(d) { return (findx(d[datapath],d.xcoord,d.ycoord,centerx,centery)) - 5})

		  .attr("y", function(d) { return (findy(d[datapath],d.xcoord,d.ycoord,centerx,centery)) + 5})

		  ;



		  svg.selectAll("text.ringlabel")

		  .data([1.0, .9, .8, .7, .6, .5, .4, .3, .2, .1])

		  .text(function(d) { return (d == .2) ? "" + (Math.round((d * max) * 10)/10 ) + ringtype : (Math.round((d * max) * 10)/10 )})

			    .transition()

			    .duration(3000)

			    .style("opacity", 1);

		  ;

		  svg.selectAll("path")

			    .transition()

			    .duration(3000)

			    .style("opacity", 0);

		  ;
		  

		  function findx(costin, thisx, thisy, cenx, ceny) {

				var xramp=d3.scale.linear().domain([-8.5,43]).range([0,w]);

				var yramp=d3.scale.linear().domain([55.5,22.5]).range([0,h]);

				

				var costramp=d3.scale.linear().domain([0,max]).range([0,1000]);



					var xdiff = xramp(thisx) - xramp(cenx) + .001;

					var ydiff = yramp(thisy) - yramp(ceny) + .001;

					

					var hypotenuse = Math.sqrt((Math.pow(xdiff,2)) + (Math.pow(ydiff,2)));

					var ratio = costramp(costin) / hypotenuse;

				  

			  return (ratio * xdiff) + (w / 2);

		  }

		  function findy(costin, thisx, thisy, cenx, ceny) {

				var xramp=d3.scale.linear().domain([-8.5,43]).range([0,w]);

				var yramp=d3.scale.linear().domain([55.5,22.5]).range([0,h]);

				

				var costramp=d3.scale.linear().domain([0,max]).range([0,1000]);



					var xdiff = xramp(thisx) - xramp(cenx) + .001;

					var ydiff = yramp(thisy) - yramp(ceny) + .001;

					

					var hypotenuse = Math.sqrt(Math.pow(xdiff,2) + Math.pow(ydiff,2));

					var ratio = costramp(costin) / hypotenuse;

				  

			  return (ratio * ydiff) + (h / 2);

		  }

	}

var legendt = svg.selectAll("text.legendtext")

.data([0, mid/2, mid, (max/2), max])

.text(function(d, i) { return (i == 4) ? ("" + d + ringtype) : ("" + d)})

  .transition()

  .duration(3000)

.style("opacity", .8)	  

;

	}
