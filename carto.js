function runCarto(action) {
		var equipeBtn = document.getElementById('rb_equipecarto');
		var rbcartosituation = document.getElementsByName
		var situBtn = undefined;
		
		if (document.getElementById("actuel").checked) {
			situBtn = document.getElementById('actuel');
		}
		else if(document.getElementById("bellecour").checked){
			situBtn = document.getElementById('bellecour');
		}
		else {
			situBtn = document.getElementById('partdieu');
		}	
		
		shiftcarto(action, equipeBtn.checked, situBtn.value);
};

function cartogram() {

w = 1200;
h = 700;
//Taille de la carte

var svg = d3.select("div#carto").append("svg")

    .attr("width", w)

    .attr("height", h);



d3.json("cartdat.json", function(json) {


	  var xramp=d3.scale.linear().domain([0,1200]).range([0,1]);

	  var yramp=d3.scale.linear().domain([0,700]).range([0,1]);

	  var colorramp=d3.scale.linear().domain([0,100,200]).range(["red","yellow","blue"]);

	  var sites = json;

	  cartoSetCenter = 2;

	  restoreCarto = true;

	  svg.selectAll("circle.dccircle")

	  .data([1.0, .9, .8, .7, .6, .5, .4, .3, .2, .1])

	  .enter().append("circle")

	  .attr("cx", 600)

	  .attr("cy", 350)

	  .attr("r", function(d) { return (d * 1200)})



	  .attr("class", "dccircle")

	  .style("stroke", "orange")

	  .style("fill", "white")

	  .style("opacity", 0);



		  svg.selectAll("rect.legendrects")

		  .data([0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200])


		  .enter().append("rect")

		  .attr("x", function(d) { return (d + 20)})

		  .attr("y", 650)

		  .attr("width", 20)

		  .attr("height", 10)

		  .attr("fill", function(d) { return (colorramp(d))})

		  .attr("class", "legendrects")

		  .style("opacity", 1)

		  ;

		  var colorramp=d3.scale.linear().domain([0,25,50]).range(["red","yellow","blue"]);

	  svg.selectAll("rect.siterects")

	  .data(sites)

	  .enter().append("rect")

	  .attr("x", function(d) {return (xramp(d.xcoord) * 1200) })

	  .attr("y", function(d) { return (xramp(d.xcoord) * 700) })

	  .attr("width", function(d) { return ((d.scale < 90) ? d.scale / 20 : 8)})

	  .attr("height", function(d) { return ((d.scale < 90) ? d.scale / 20 : 8)})

	  .attr("fill", function(d) { return (colorramp(d.we_rom))})

	  .attr("class", "siterects")

	  .style("opacity", 1)

	  ;//le nom n'est pas affiché pour les point qui leur valeur de sacle plus petit



	  var legendt = svg.selectAll("text.legendtext")

	  .data([0,12, 24, 36, 48])

	  .enter().append("text")

	  .attr("x", function(d, i) { return ((i * 50) + 25)})

	  .attr("y", 640)

	  .attr("class", "legendtext")

	  .text(function(d, i) { return (i == 4) ? ("" + d + " ，mins") : ("" + d)})

	  ;

	  var titletext = svg.selectAll("text.titletext")

	  .data([0])

	  .enter().append("text")

	  .attr("x", 25)

	  .attr("y", 615)

	  .attr("class", "titletext")

	  .text("travel time by metro")

	  ;


	  var clearlabelt = svg.selectAll("text.clearbtn")

	  .data(["CLEAR LABELS","RESET LABELS"])

	  .enter().append("text")

	  .attr("x", 1000)

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

	  .attr("x", function(d) { return ((xramp(d.xcoord)  * 1200) - 5)})

	  .attr("y", function(d) { return ((yramp(d.ycoord)  * 500) + 5)})

	  .text(function(d) { return d.name })

	  .attr("opacity", function(d) { return ((d.scale > 90) ? 100 : 0)})

	  .attr("class", "dclabel")

	  .attr("id", function(d, i) { return "dclabel_" + i})

	  .on("click", mouseclick)

	  ;


	  var selectiontext = svg.selectAll("text.ringlabel")

	  .data([.0, .1, .2, .3, .4])

	  .enter().append("text")

	  .attr("x", function(d) { return ((d* 1200))})

	  .attr("y", 350)

	  .text(function(d) { return (d)})

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



function shiftcarto(center, metro, jantrue) {
	// console.log(jantrue);
	var newTitleText = "";

	//now get segments and draw d3 graph

	var svg = d3.select("div#carto svg");
//ae_XX actuel+metro, ee_XX ligneE(bellecour)+metro, pe_XX ligneE(partlieu)+metro  
// XX le point central, _ali=alai, _be=bellecour , _pd=part dieu , _pj=point du jour 

	if (metro == true) {

		var pathtype = "e";

		var ringtype = " mins";

		max = 50;

		mid = 25;

		newTitleText = "Aller a ";

	}

	else {

		var pathtype = "p";

		max = 40;

		mid = 20;

		var ringtype = " mins";

		newTitleText = "Travel time to ";
	}

	
	
	if (jantrue == 0) {

		var monthtype = "a";
		
		}
	else if(jantrue == 1) {
		
		var monthtype = "e";
		
	}
	else {

			var monthtype = "p";

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

		var datapath = "" + monthtype + pathtype + "_ali";

		centerx = 23.04035	;

		centery = 217.92263;

		newTitleText = newTitleText + "Alai" +
			" in ";

	}

	else if (center == 3) {

		var datapath = "" + monthtype + pathtype + "_be";

		centerx = 283.20428	;

		centery = 194.64235;

		newTitleText = newTitleText + "Bellecour in ";

	}

	else if (center == 4) {

		var datapath = "" + monthtype + pathtype + "_pj";

		centerx = 140.16212	;

		centery = 197.88239;

		newTitleText = newTitleText + "Point du jour in ";

	}

	else if (center == 5) {

		var datapath = "" + monthtype + pathtype + "_pd";

		centerx = 378.72572	;

		centery = 178.44215;

		newTitleText = newTitleText + "Part lieu in ";

	}

	if (monthtype == "e") {
		newTitleText = newTitleText + "ligne E(Bellecour)";
	}
	else if (monthtype == "p") {
		newTitleText = newTitleText + "ligne E(part lieu)";
	}
	else {
		newTitleText = newTitleText + "actuelle";
	}

			var xramp=d3.scale.linear().domain([10,600]).range([0,1200]);

			  var yramp=d3.scale.linear().domain([100,450]).range([0,500]);

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

		  .data([ .5, .4, .3, .2, .1])

		  .text(function(d) { return (d*120) +  ringtype })

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

				var xramp=d3.scale.linear().domain([10,400]).range([0,w]);

				var yramp=d3.scale.linear().domain([110,450]).range([0,h]);



				var costramp=d3.scale.linear().domain([0,max]).range([0,1000]);



					var xdiff = xramp(thisx) - xramp(cenx) + .001;

					var ydiff = yramp(thisy) - yramp(ceny) + .001;



					var hypotenuse = Math.sqrt((Math.pow(xdiff,2)) + (Math.pow(ydiff,2)));

					var ratio = (costramp(costin) / hypotenuse)/2.3;



			  return (ratio * xdiff) + (w / 2);

		  }

		  function findy(costin, thisx, thisy, cenx, ceny) {

				var xramp=d3.scale.linear().domain([10,400]).range([0,w]);

				var yramp=d3.scale.linear().domain([110,450]).range([0,h]);



				var costramp=d3.scale.linear().domain([0,max]).range([0,1000]);



					var xdiff = xramp(thisx) - xramp(cenx) + .001;

					var ydiff = yramp(thisy) - yramp(ceny) + .001;



					var hypotenuse = Math.sqrt(Math.pow(xdiff,2) + Math.pow(ydiff,2));

					var ratio = (costramp(costin) / hypotenuse)/2.3;



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
