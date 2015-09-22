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

      var pieChartData = [
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

      var donutChartData = [
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
      var radarChartData = {
        labels: ["Python", "Ruby", "Puppet", "Haxe", "Shell", "C", "Javascript", "C++", "Java"],
        datasets: [
        {
          label: "Cisco Users",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [31.6, 15.3, 14.3, 4.9, 4.2, 2.9, 2, 1.6, 1.3]
        },
        {
          label: "General Users",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [11.6, 18.8, 0.1, 0.1, 2, 6.2, 16, 3.5, 7.4]
        }
        ]
      }; // radar chart

      // polar area chart
      var polarAreaChartData = [
      {
        value: 31.6,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Python"
      },
      {
        value: 15.3,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Ruby"
      },
      {
        value: 4.9,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Haxe"
      },
      {
        value: 4.2,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Shell"
      },
      {
        value: 2.9,
        color: "#4D5360",
        highlight: "#616774",
        label: "C"
      }

      ];

      window.onload = function(){
        var monthlyContributions_line = document.getElementById("monthlyContributions-line").getContext("2d");

        var commonLanguages_bar = document.getElementById("commonLanguages-bar").getContext("2d");

        var ctx_pie = document.getElementById("templatemo-pie-chart").getContext("2d");

        var ctx_doughnut = document.getElementById("templatemo-doughnut-chart").getContext("2d");

        var ctxRadar = document.getElementById("templatemo-radar-chart").getContext("2d");

        var ctxPolar = document.getElementById("templatemo-polar-chart").getContext("2d");

        window.monthlyContributions = new Chart(monthlyContributions_line).Line(monthlyCommits, {
          responsive: true
        }); // final

        window.commonLanguages = new Chart(commonLanguages_bar).Bar(commonLanguages, {
          responsive: true
        }); // final

        window.myPieChart = new Chart(ctx_pie).Pie(pieChartData,{
          responsive: true
        });

        window.myDoughnutChart = new Chart(ctx_doughnut).Doughnut(donutChartData,{
          responsive: true
        });

        var myRadarChart = new Chart(ctxRadar).Radar(radarChartData, {
          responsive: true
        });

        var myPolarAreaChart = new Chart(ctxPolar).PolarArea(polarAreaChartData, {
          responsive: true
        });

      };