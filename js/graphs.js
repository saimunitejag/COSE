      // Line chart
      var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
      var commonLanguages = {
        labels : ["Python","Javascript", "Java", "Ruby","C","C++","Go","Others"],
        datasets : [
        {
          label: "Most Common Languages",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [24, 15, 13, 12, 8, 4, 4, 20]
        }
        ]

      } // common languages

      var monthlyCommits = {
        labels : ["January","February","March", "April", "May", "June", "July", "August", "September", "October"],
        datasets : [
        {
          label: "Monthly Commits",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [320,405,153,148,167,111,281,200,146, 201]
        }
        ]

      } // commits by month

      var topUsersByReposOwned = {
        labels : ["hemanth","trevorwang","nvoron23", "weixu8", "rajasoun", "animeshinvinci", "mokhan", "AlexBaranosky", "dafyddcrosby", "bozzmob"],
        datasets : [
        {
          label: "Top Users by # of Repos Owned",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [457, 420, 419, 302, 200, 194, 148, 124, 108, 104]
        }
        ]
      } // top users by Repos owned

      var topUsersByFollowers = {
      labels : ["hemanth","hoisie","v0lkan", "brikis98", "jonathanslenders", "akeep", "AlexBaranosky", "retr0h", "rohanagrawal",  "mestery"],
      datasets : [
        {
          label: "Top Users by # of Followers",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [534, 376, 252, 204, 194, 68, 65, 63, 56, 45]
      }
      ]

      } // top users by Followers

      var forksPieChartData = [
      {
        value: 648,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 361,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Web.go"
      },
      {
        value: 208,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Mantl"
      },
      {
        value: 159,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "Redis"
      },
      {
        value: 112,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "Nexus9000"
      }
      ] // pie chart data

      var watchersDonutChartData = [
      {
        value: 1932,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 903,
        color: "#2e8a0c",
        highlight: "#3db810",
        label: "PtPython"
      },
      {
        value: 1570,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Pyvim"
      },
      {
        value: 1839,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "Python-Prompt-Toolkit"
      },
      {
        value: 598,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "Thor"
      }
      ] // donut chart data

      // radar chart
      var languagesRadarChartData = {
        labels: ["Python","Javascript", "Java", "Ruby","C","C++","Go","Others"],
        datasets: [
        {
          label: "Cisco Users",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [24, 15, 13, 12, 8, 4, 4, 20]
        }
        ]
      }; // radar chart

      var contributorPieChartData = [
      {
        value: 5102,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "hemanth"
      },
      {
        value: 3889,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "jsquyres"
      },
      {
        value: 1779,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "jonathanslenders"
      },
      {
        value: 1621,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "shihuade"
      },
      {
        value: 1550,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "andyyuan78"
      }
      ] // pie chart


      var lineChartData = {
        labels : ["Controller", "YangTools", "BGPCep", "Mdsal", "OpenFlow Plugin"],
        datasets : [
        {
          label: "ODL Top 5 Project Commits",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [3267, 1834, 1582, 1330, 1083]
        },
        {
          label: "ODL Top 5 Project by Lines of Code",
          fillColor : "rgba(220,220,220,0.2)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [1889, 690, 584, 406, 298]
        }

        ]

      };