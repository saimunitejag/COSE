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
        labels : ["v0lkan","hildjj","lizhizhou", "danehans", "WenyuChang", "davidzou", "svalleru", "retr0h", "fuji246", "ttsvetko"],
        datasets : [
        {
          label: "Top Users by # of Repos Owned",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [81, 81, 80, 77, 74, 66, 65, 64, 64, 56]
        }
        ]
      } // top users by Repos owned

      var topUsersByFollowers = {
      labels : ["hemanth","hoisie","v0lkan", "brikis98", "jonathanslenders", "AlexBaranosky", "retr0h", "rohanagrawal", "akeep", "mestery"],
      datasets : [
        {
          label: "Top Users by # of Followers",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [415, 361, 243, 184, 158, 63, 62, 58, 57, 41]
      }
      ]

      } // top users by Followers

      var forksPieChartData = [
      {
        value: 616,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 343,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Web.go"
      },
      {
        value: 176,
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
        value: 102,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "Moustache"
      }
      ] // pie chart data

      var watchersDonutChartData = [
      {
        value: 1892,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Openh264"
      },
      {
        value: 851,
        color: "#2e8a0c",
        highlight: "#3db810",
        label: "PtPython"
      },
      {
        value: 1557,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Pyvim"
      },
      {
        value: 1779,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "Python-Prompt-Toolkit"
      },
      {
        value: 596,
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
        value: 1862,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "johnweldon"
      },
      {
        value: 836,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Snergster"
      },
      {
        value: 685,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "fluffy"
      },
      {
        value: 568,
        color: "#e6ad14",
        highlight: "#e8b52b",
        label: "danehans"
      },
      {
        value: 530,
        color: "#9b12cf",
        highlight: "#cd72f0",
        label: "BrianHicks"
      }
      ] // pie chart data


      var lineChartData = {
        labels : ["Cisco", "Independent", "RedHat","Brocade","Linux Foundation","Pantheon","Ericsson","NEC", "IBM", "Others"],
        datasets : [
        {
          label: "ODL Contributions",
          fillColor : "rgba(151,187,205,0.2)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [53,7,6,5,5,4,3,3,2,12]
        }
        ]

      }; // lineChartData used for testing