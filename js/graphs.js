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