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
        labels: ["Python","Ruby","Shell","C","Go","Javascript","Java", "Haxe"],
        datasets: [
        {
          label: "Cisco Users",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [35, 12, 4, 3, 3, 2, 2, 5]
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