var SERVER_IP = "128.107.5.189";
var PORT = 3000;

var API = "http://"+SERVER_IP+":"+PORT+"/api";

function top_10_repo_owned(userType){
  var svg = dimple.newSvg("#repoOwnedChartContainer",553, 400);

  d3.json(API+"/user/toprepo/"+userType, function (data) {

  // Fill the SVG background
  svg.append("rect")
    .attr("x", "8px")
    .attr("y", "8px")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("fill", "#FFF");

    // Configure a simple bar chart
    var myChart = new dimple.chart(svg, data),
        xAxis = myChart.addCategoryAxis("x", "login"),
        yAxis = myChart.addMeasureAxis("y", "abs(public_repos)"),
        mySeries = myChart.addSeries("login", dimple.plot.bar);

    xAxis.fontSize="15px";
    // Draw without any axes
    xAxis.hidden = false;
    yAxis.hidden = true;

    // Set small margins as there is going to be no axes displayed
    myChart.setMargins(14, 18, 6, 150);

    // Define a custom color palette.  These colours are based on the excellent
    // set at http://flatuicolors.com/
    myChart.defaultColors = [
        new dimple.color("#007BA4", 1), // blue
        new dimple.color("#008AB8", 1), // blue
        new dimple.color("#0099CC", 1), // blue
        new dimple.color("#00B0EB", 1), // blue
        new dimple.color("#0BC2FF", 1), // blue
        new dimple.color("#2ACAFF", 1), // blue
        new dimple.color("#4AD2FF", 1), // blue
        new dimple.color("#69D9FF", 1), // blue
        new dimple.color("#88E1FF", 1), // blue
        new dimple.color("#A7E9FF", 1), // blue
    ];


    svg.append("text")
   .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
   .attr("y", myChart._yPixels() +10)
   .style("text-anchor", "middle")
   .style("font-size", "20px")
   .style("fill", "#000")
   .style("font-family", "sans-serif")
   .style("font-weight", "bold")
   .text("");

    // Set some custom display elements for each series shape
    mySeries.afterDraw = function (s, d) {

      // I've defined the width in terms of the golden ratio as it seems like the sort
      // of thing a designer would do.
      var shape = d3.select(s),
          goldenRatio = 1.61803398875;

      // Add a rectangle to the bar giving a nice style.  The idea was borrowed
      // from sirocco's question here:
      // http://stackoverflow.com/questions/25044608/dimplejs-barchart-styling-columns
      svg.append("rect")
        .attr("x", shape.attr("x"))
        .attr("y", shape.attr("y"))
        .attr("height", shape.attr("height"))
        .attr("width", (0.5 * shape.attr("width")) / goldenRatio)
        .style("fill", shape.style("stroke"))
        .style("opacity", 1)
        .style("pointer-events", "none");

      // Add some bar labels for the yValue
      svg.append("text")
        .attr("x", parseFloat(shape.attr("x")) + shape.attr("width") / 2)
        .attr("y", parseFloat(shape.attr("y")) - 10)
        .style("font-family", "courier new")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#000")
        .style("pointer-events", "none")
        .text(yAxis._getFormat()(d.yValue));

      // Draw without a border
      shape.attr("stroke", shape.attr("fill"));

    };

    // Override the standard tooltip behaviour
    mySeries.addEventHandler("mouseover", function (e){

      // Draw the text information in the top left corner
      svg.selectAll(".dimple-hover-text")
        .data([e.xValue, d3.format(",.f")(e.yValue)])
          .enter()
          .append("text")
          .attr("class", "dimple-hover-text")
          .attr("x", myChart._xPixels()  + myChart._widthPixels() - 25)
          .attr("y", function (d, i) { return myChart._yPixels() + 30 + i * 25; })
          .style("font-family", "courier new")
          .style("text-anchor", "end")
          .style("font-size", "20px")
          .style("fill", "#000")
          .style("pointer-events", "none")
          .text(function (d) { return d; });

      // Put a coloured bar next to the text for no good reason
      svg.append("rect")
        .attr("class", "dimple-hover-text")
        .attr("x", myChart._xPixels() + myChart._widthPixels() - 15)
        .attr("y", myChart._yPixels())
        .attr("height", 60)
        .attr("width", 10)
        .style("fill", myChart.getColor(e.xValue).fill)
        .style("opacity", 1)
        .style("pointer-events", "none");

    });

    // Clear the text on exit
    mySeries.addEventHandler("mouseleave", function (e) {
      svg.selectAll(".dimple-hover-text").remove();
    });

    // Render everything
    myChart.draw();

  });
}  

function top_10_users_by_followers(){
  var svg = dimple.newSvg("#repoFollowersChartContainer", 553, 400);

  d3.json(API+"/user/topten", function (data) {

  // Fill the SVG background
  svg.append("rect")
    .attr("x", "8px")
    .attr("y", "8px")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("fill", "#FFF");

    // Configure a simple bar chart
    var myChart = new dimple.chart(svg, data),
        xAxis = myChart.addCategoryAxis("x", "login"),
        yAxis = myChart.addMeasureAxis("y", "abs(followers)"),
        mySeries = myChart.addSeries("login", dimple.plot.bar);

    // Draw without any axes
    xAxis.hidden = false;
    yAxis.hidden = true;

    xAxis.fontSize= "15px";
    // Set small margins as there is going to be no axes displayed
    myChart.setMargins(14, 18, 6, 150);

    // Define a custom color palette.  These colours are based on the excellent
    // set at http://flatuicolors.com/
    myChart.defaultColors = [
        new dimple.color("#007BA4", 1), // blue
        new dimple.color("#008AB8", 1), // blue
        new dimple.color("#0099CC", 1), // blue
        new dimple.color("#00B0EB", 1), // blue
        new dimple.color("#0BC2FF", 1), // blue
        new dimple.color("#2ACAFF", 1), // blue
        new dimple.color("#4AD2FF", 1), // blue
        new dimple.color("#69D9FF", 1), // blue
        new dimple.color("#88E1FF", 1), // blue
        new dimple.color("#A7E9FF", 1), // blue
    ];

    /*
    svg.append("text")
   .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
   .attr("y", myChart._yPixels() +10)
   .style("text-anchor", "middle")
   .style("font-size", "20px")
   .style("fill", "#000")
   .style("font-family", "sans-serif")
   .style("font-weight", "bold")
   .text("TOP 10 USERS BY # FOLLOWERS");
   */

    // Set some custom display elements for each series shape
    mySeries.afterDraw = function (s, d) {

      // I've defined the width in terms of the golden ratio as it seems like the sort
      // of thing a designer would do.
      var shape = d3.select(s),
          goldenRatio = 1.61803398875;

      // Add a rectangle to the bar giving a nice style.  The idea was borrowed
      // from sirocco's question here:
      // http://stackoverflow.com/questions/25044608/dimplejs-barchart-styling-columns
      svg.append("rect")
        .attr("x", shape.attr("x"))
        .attr("y", shape.attr("y"))
        .attr("height", shape.attr("height"))
        .attr("width", (0.5 * shape.attr("width")) / goldenRatio)
        .style("fill", shape.style("stroke"))
        .style("opacity", 1)
        .style("pointer-events", "none");

      // Add some bar labels for the yValue
      svg.append("text")
        .attr("x", parseFloat(shape.attr("x")) + shape.attr("width") / 2)
        .attr("y", parseFloat(shape.attr("y")) - 10)
        .style("font-family", "courier new")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "black")
        .style("pointer-events", "none")
        .text(yAxis._getFormat()(d.yValue));

      // Draw without a border
      shape.attr("stroke", shape.attr("fill"));

    };

    // Override the standard tooltip behaviour
    mySeries.addEventHandler("mouseover", function (e){

      // Draw the text information in the top left corner
      svg.selectAll(".dimple-hover-text")
        .data([e.xValue, d3.format(",.f")(e.yValue)])
          .enter()
          .append("text")
          .attr("class", "dimple-hover-text")
          .attr("x", myChart._xPixels()  + myChart._widthPixels() - 25)
          .attr("y", function (d, i) { return myChart._yPixels() + 30 + i * 25; })
          .style("font-family", "courier new")
          .style("text-anchor", "end")
          .style("font-size", "20px")
          .style("fill", "#000")
          .style("pointer-events", "none")
          .text(function (d) { return d; });

      // Put a coloured bar next to the text for no good reason
      svg.append("rect")
        .attr("class", "dimple-hover-text")
        .attr("x", myChart._xPixels() + myChart._widthPixels() - 15)
        .attr("y", myChart._yPixels())
        .attr("height", 60)
        .attr("width", 10)
        .style("fill", myChart.getColor(e.xValue).fill)
        .style("opacity", 1)
        .style("pointer-events", "none");
    });
    // Clear the text on exit
    mySeries.addEventHandler("mouseleave", function (e) {
      svg.selectAll(".dimple-hover-text").remove();
    });

    // Render everything
    myChart.draw();

  });
}

function number_of_forks(){
    
  var width = 250,
      height = 250,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#d0743c", "#ff8c00","#a05d56","#8a89a6","#6b486b"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d["abs(A.forks_count)"]; });

  var svg = d3.select("#forks-pie-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json(API+"/repo/User/forks", function(error, data) {

    data.forEach(function(d) {
      d["abs(A.forks_count)"] = +d["abs(A.forks_count)"];
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data["name"]); });
    
    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".5em")
        .style("fill", "#FFF")
        .style("font-size", "11px")
    .style("font-weight", "lighter")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data["name"]; });
  });
}

function number_of_watchers(){
    
  var width = 250,
      height = 250,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#d0743c", "#ff8c00","#a05d56","#8a89a6","#6b486b"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d["abs(A.watchers_count)"]; });

  var svg = d3.select("#watchers-doughnut-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json(API+"/repo/User/watchers", function(error, data) {

    data.forEach(function(d) {
      d["abs(A.watchers_count)"] = +d["abs(A.watchers_count)"];
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data["name"]); });
    
    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".5em")
        .style("fill", "#FFF")
        .style("font-size", "11px")
    .style("font-weight", "lighter")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data["name"]; });
  });
}

function top_user_events(){

  var width = 200,
      height = 200,
      radius = Math.min(width, height) / 2;


  var color = d3.scale.ordinal()
      .range(["#e53517", "#ff7f0e", "#ffbb78","#7ab51d","#ecf0f1","#ffc400"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 40);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d["count(actor_login)"]; });

  var svg = d3.select("#contributor-doughnut").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json(API+"/contri/share", function(error, data) {

    data.forEach(function(d) {
      d["count(actor_login)"] = +d["count(actor_login)"];
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.actor_login); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.actor_login; });
  });
}

 // Line chart
      
      var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
      var commonLanguages = {
        labels : ["Python","Ruby","Shell","C","Go","Javascript","Java"],
        datasets : [
        {
          label: "Most Common Languages",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [35, 12, 5, 3, 3, 2, 2]
        }
        ]

      } // common languages

      var monthlyCommits = {
        labels : ["January","February","March", "April", "May", "June", "July", "August", "September"],
        datasets : [
        {
          label: "Monthly Commits",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [324,407,160,148,171,111,286,201,148]
        }
        ]

      } // commits by month

      var topUsersByReposOwned = {
        labels : ["danehans","BrianHicks","alop", "rickerc", "vallard", "fluffy", "iawells", "johnweldon", "ddutta", "kecorbin"],
        datasets : [
        {
          label: "Top Users by # of Repos Owned",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [77, 59, 45, 44, 36, 33, 31, 30, 23, 22]
        }
        ]
      } // top users by Repos owned



      var topUsersByFollowers = {
      labels : ["fluffy","danehans","BrianHicks", "pcl", "ddutta", "kazhang", "vallard", "hpreston", "Snergster", "alop"],
      datasets : [
        {
          label: "Top Users by # of Followers",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [55, 21, 17, 17, 15, 13, 13, 12, 12, 11]
      }
      ]

      } // top users by Followers

      var forksPieChartData = [
      {
        value: 592,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 81,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Libsrtp"
      },
      {
        value: 79,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Pyvim"
      },
      {
        value: 73,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "Python-Prompt-Toolkit"
      },
      {
        value: 64,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "Thor"
      }
      ] // pie chart data

      var watchersDonutChartData = [
      {
        value: 1814,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 760,
        color: "#2e8a0c",
        highlight: "#3db810",
        label: "PtPython"
      },
      {
        value: 1516,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Pyvim"
      },
      {
        value: 1672,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "Python-Prompt-Toolkit"
      },
      {
        value: 575,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "Thor"
      }
      ] // donut chart data

      // radar chart
      var languagesRadarChartData = {
        labels: ["Python","Ruby", "Haxe", "Shell","C","Go","Javascript","Java"],
        datasets: [
        {
          label: "Cisco Users",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [35, 12, 5, 4, 3, 3, 2, 2, ]
        }
        ]
      }; // radar chart

      var contributorPieChartData = [
      {
        value: 25,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "johnweldon"
      },
      {
        value: 11,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Snergster"
      },
      {
        value: 9,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "fluffy"
      },
      {
        value: 8,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "danehans"
      },
      {
        value: 7,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "BrianHicks"
      },
      {
        value: 5,
        color: "rgba(151,187,205,1)",
        highlight: "rgba(151,187,205,0.5)",
        label: "altvnk"
      }
      ] // pie chart data


      var lineChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
        {
          label: "My First dataset",
          fillColor : "rgba(220,220,220,0.2)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(220,220,220,1)",
          data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
          label: "My Second dataset",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
        ]

      }; // lineChartData used for testing
