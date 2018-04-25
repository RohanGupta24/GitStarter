// init controller
   var controller = new ScrollMagic.Controller();

   // Parallax background
   new ScrollMagic.Scene({
           triggerElement: "#parallax",
           triggerHook: "onEnter",
       })
       .duration('200%')
       .setTween("#parallax", {
           backgroundPosition: "500% 100%",
           ease: Linear.easeNone
       })
       //.addIndicators() // add indicators (requires plugin)
       .addTo(controller);


   new ScrollMagic.Scene({
           triggerElement: "#slidein2",
           triggerHook: "onLeave",
       })
       .duration('100%')
       .setTween("#parallax", {
           backgroundPosition: "500% 100%",
           ease: Linear.easeNone
       })
       .setPin("#slidein2")
//        .addIndicators() // add indicators (requires plugin)
       .addTo(controller);

   new ScrollMagic.Scene({
           triggerElement: "#slidein3",
           triggerHook: "onLeave",
       })
       .setPin("#slidein3")
//        .addIndicators() // add indicators (requires plugin)
       .addTo(controller);


   //Moving divs
   // Fade in
   var fadeInTimeline = new TimelineMax();
   var fadeInFrom = TweenMax.from("#opacity1", 1, {
       autoAlpha: 0
   });
   var fadeInTo = TweenMax.to("#opacity2", 0, {
       autoAlpha: 1
   });
   fadeInTimeline
       .add(fadeInFrom)
       .add(fadeInTo);

   new ScrollMagic.Scene({
           triggerElement: "#slidein2",
           offset: 100,
       })
       .setTween(fadeInTimeline)
       .duration(200)
       //    .reverse(false)
       //.addIndicators() // add indicators (requires plugin)
       .addTo(controller);


   var fadeInTimeline2 = new TimelineMax();
   var fadeInFrom2 = TweenMax.from("#opacity2", 1, {
       autoAlpha: 0
   });
   var fadeInTo2 = TweenMax.to("#opacity1", 0, {
       autoAlpha: 1
   });
   fadeInTimeline2
       .add(fadeInFrom2)
       .add(fadeInTo2);

   new ScrollMagic.Scene({
           triggerElement: "#slidein3",
           offset: 100,
       })
       .setTween(fadeInTimeline2)
       .duration(400)
       //    .reverse(false)
       //.addIndicators() // add indicators (requires plugin)
       .addTo(controller);
function onLoad() {


Vue.use(VueCharts);

Vue.component("search-box", {
    template: "#search-template",
    props: ["icon", "ownerurl", "author", "projecturl", "projectname", "projectdescription", "price", "index"],
    computed: {
      columns: {
        get: function() {
          return this.columnsData;
        },
        set: function(newValue) {
          if(newValue === "columnWeek") {
            this.columnsData = this.columnsWeek;
          }
          else if(newValue === "columnMonth") {
            this.columnsData = this.columnsMonth;
          }
          else if(newValue === "columnYear") {
            this.columnsData = this.columnsYear;
          }
        }
      },
      rows: {
        get: function() {
          return this.rowsData;
        },
        set: function(newValue) {
          if(newValue === "rowWeek") {
            this.rowsData = this.rowsWeek;
          }
          else if(newValue === "rowMonth") {
            this.rowsData = this.rowsMonth;
          }
          else if(newValue === "rowYear") {
            this.rowsData = this.rowsYear;
          }
        }
      },
      options: {
        get: function() {
          return this.optionsData;
        },
        set: function(newValue) {
          console.log(newValue)
          if(newValue === "optionWeek") {
            this.optionsData = this.optionsWeek;
          }
          else if(newValue === "optionMonth") {
            console.log("here")
            this.optionsData = this.optionsMonth;
          }
          else if(newValue === "optionYear") {
            this.optionsData = this.optionsYear;
          }
        }
      }
    },
    created: function() {
      this.columnsData = this.columnsWeek;
      this.rowsData = this.rowsWeek;
      this.optionsData = this.optionsWeek;
      this.headerTitle = "Weekly Performance";
    },
    data: function() {
      return {headerTitle: "", columnsData: this.columnsWeek, rowsData: this.rowsWeek, optionsData: this.optionsWeek, showElement: true, showSell: false, showBuy: false, showGraph: false,
        columnsWeek: [{
            'type': 'string',
            'label': 'Days'
        }, {
            'type': 'number',
            'label': 'Worth'
        }],
        rowsWeek: [
            ['Monday', 1000],
            ['Tuesday', 1170],
            ['Wednesday', 660],
            ['Thursday', 1100],
            ['Friday', 1300]
        ],
        optionsWeek: {
            legend: {
              display: true
            },

            hAxis: {
                title: 'Days',
                minValue: 'Monday',
                maxValue: 'Friday',
                  textStyle: {color: 'white'}
            },
            vAxis: {
                title: 'GitCoins',
                minValue: 300,
                maxValue: 1200
            },
            width: 900,
            height: 400,
            linearType: 'function',
        },

        columnsMonth: [{
            'type': 'string',
            'label': 'Days'
        }, {
            'type': 'number',
            'label': 'Worth'
        }],
        rowsMonth: [
            ['4/01', 1000],
            ['4/02', 1170],
            ['4/03', 660],
            ['4/04', 1030],
            ['4/05', 209],
            ['4/06', 1000],
            ['4/07', 1170],
            ['4/08', 660],
            ['4/09', 1030],
            ['4/10', 1000],
            ['4/11', 1170],
            ['4/12', 660],
            ['4/13', 1030],
            ['4/14', 1000],
            ['4/15', 1170],
            ['4/16', 660],
            ['4/17', 1030],
            ['4/18', 1000],
            ['4/19', 1170],
            ['4/20', 660],
            ['4/21', 1030],
            ['4/22', 1000],
            ['4/23', 1170],
            ['4/24', 660],
            ['4/25', 1030],
            ['4/26', 1000],
            ['4/27', 1170],
            ['4/28', 660],
            ['4/29', 1030],
        ],
        optionsMonth: {
            legend: {
              display: true
            },

            hAxis: {
                title: 'Days',
                titlePosition: 'none',
                minValue: '4/01',
                maxValue: '4/29',
                textStyle: {color: 'white'}
            },
            vAxis: {
                title: 'GitCoins',
                minValue: 300,
                maxValue: 1200
            },
            width: 900,
            height: 400,
            linearType: 'function',
        },

        columnsYear: [{
            'type': 'string',
            'label': 'Week'
        }, {
            'type': 'number',
            'label': 'Worth'
        }],
        rowsYear: [
            ['1/01', 1000],
            ['1/07', 1170],
            ['1/14', 660],
            ['1/21', 1030],
            ['1/30', 209],
            ['2/06', 1000],
            ['2/13', 1170],
            ['2/20', 660],
            ['2/27', 1030],
            ['3/05', 1000],
            ['3/12', 1170],
            ['3/19', 660],
            ['3/27', 1030],
            ['4/03', 1000],
            ['4/10', 1170],
            ['4/17', 660],
            ['4/24', 1030],
            ['5/03', 1000],
            ['5/10', 1170],
            ['5/23', 660],
            ['5/30', 1030],
            ['6/06', 1000],
            ['6/15', 1170],
            ['6/20', 660],
            ['6/27', 1030],
            ['7/01', 1000],
            ['7/07', 1170],
            ['7/14', 660],
            ['7/21', 1030],
            ['8/01', 1000],
            ['8/07', 1170],
            ['8/14', 660],
            ['8/21', 1030],
            ['8/30', 209],
            ['9/06', 1000],
            ['9/13', 1170],
            ['9/20', 660],
            ['9/27', 1030],
            ['10/05', 1000],
            ['10/12', 1170],
            ['10/19', 660],
            ['10/27', 1030],
            ['11/03', 1000],
            ['11/10', 1170],
            ['11/17', 660],
            ['11/24', 1030],
            ['12/03', 1000],
            ['12/10', 1170],
            ['12/23', 660],
            ['12/30', 1030],
        ],
        optionsYear: {
            legend: {
              display: true
            },

            hAxis: {
                title: 'Days',
                titlePosition: 'none',
                minValue: '4/01',
                maxValue: '4/29',
                textStyle: {color: 'white'}
            },
            vAxis: {
                title: 'GitCoins',
                minValue: 300,
                maxValue: 1200
            },
            width: 900,
            height: 400,
            linearType: 'function',
        },


      };
    },
    methods: {
      weekly: function() {
        this.columns = "columnWeek";
        this.rows = "rowWeek";
        this.options = "optionWeek";
        this.headerTitle = "Weekly Performance";
      },
      monthly: function() {
        this.columns = "columnMonth";
        this.rows = "rowMonth";
        this.options = "optionMonth";
        this.headerTitle = "Monthly Performance";
      },
      yearly: function() {
        this.columns = "columnYear";
        this.rows = "rowYear";
        this.options = "optionYear";
        this.headerTitle = "Yearly Performance";
      },
      showSellModal: function() {
        this.showSell = true;
        this.showBuy = false;
        this.showElement = false;
      },
      showBuyModal: function() {
        this.showBuy = true;
        this.showSell = false;
        this.showElement = false;
      },

      showGraphModal: function() {
        this.showGraph = true;
      },

      closeGraphModal: function() {
        this.showGraph = false;
      },
      confirmBuy: function() {
        //IMPORTANT
        console.log("confirmed purchase")
      },
      denyBuy: function() {
        this.showSell = false;
        this.showBuy = false;
        this.showElement = true;
      },
      confirmSell: function() {
        //IMPORTANT
        console.log("confirmed sell")
      },
      denySell: function() {
        this.showSell = false;
        this.showBuy = false;
        this.showElement = true;
      },
    }
  });

new Vue({
    el: "#OrderPickContainer",
    data: {
        searchWords: "",
        tableErrorMessage: "",
        tableHeader: "",
        ProjectsLists: [
          {
            Icon: "ICON",
            ProjectName: "tabler",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Tabler is free and open-source HTML Dashboard UI Kit built on Bootstrap 4",
            Author: "tabler",
            Prices: 400
          },
          {
            Icon: "ICON",
            ProjectName: "Interview-Notebook",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "books: 技术面试需要掌握的基础知识整理，欢迎编辑~",
            Author: "CyC2018",
            Prices: 400
          },
          {
            Icon: "ICON",
            ProjectName: "whatsapp-web-reveng",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Reverse engineering WhatsAppWeb.",
            Author: "sigalor",
            Prices: 400
          },
          {
            Icon: "ICON",
            ProjectName: "structured-text-tools",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "structured-text-tools",
            Author: "dbhodan",
            Prices: 400
          },

        ],
    },
    methods: {
      search: function() {
        let self = this
        var results = new Array();
        if(this.searchWords.length != 0) {
          this.tableHeader = "Search Results"
        }
        else {
          this.tableHeader = "Top Trending Projects"
        }
        var url = "https://api.github.com/search/repositories?q=" + this.searchWords + "&sort=stars&order=desc";
        fetch(url, {
          method: 'GET',
        })
        .then(function(res) {
          if(res.ok) {
            res.json().then(function(data) {
              if(data.items.length == 0 || data.items[0] == undefined) {
                //SHOW TOP TRENDING PROJECTS HERE
                self.tableErrorMessage = "No search results found"
                self.tableHeader = "Top Trending Projects"

              }
              else {
                self.tableErrorMessage = "";
                for(var i = 0; i < data.items.length; i++) {
                  var obj = new Object();
                  obj.Icon = data.items[i].owner.avatar_url;
                  console.log(obj.Icon);
                  obj.ProjectName = data.items[i].name;
                  obj.ProjectURL = data.items[i].html_url;
                  obj.OwnerURL = data.items[i].owner.html_url;
                  if(data.items[i].description != null && data.items[i].description.length > 300) {
                    obj.ProjectDescription = data.items[i].description.substring(0, 300) + "...";
                  }
                  else {
                    obj.ProjectDescription = data.items[i].description;
                  }
                  obj.Author = data.items[i].owner.login;
                  obj.Prices = 200;
                  results.push(obj);
                }
              }
            }.bind(this));
          }
          else {
            if(res.status == 422) {
              //SHOW TOP TRENDING PROJECTS HERE
              self.tableErrorMessage = ""
            }
            else if(res.status == 403) {
              //SHOW TOP TRENDING PROJECTS
              self.tableErrorMessage = "Please try again"
            }
          }
        });
        if(this.searchWords.length == 0) {
          this.tableHeader = "Top Trending Projects"
        }
        this.ProjectsLists = results;
    }
  }

});

}

/*function search() {
  console.log("search")
}*/
