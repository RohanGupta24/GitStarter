
function openNav() {
    document.getElementById("mySidenav").style.width = "290px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function onLoad() {
Vue.use(VueCharts);

Vue.component("navbar-box", {
  template: "#navbar-template",
  props: ["projectownedname"],
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
      return {headerTitle: "", columnsData: this.columnsWeek, rowsData: this.rowsWeek, optionsData: this.optionsWeek, isProjectModal: false,
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
    closeProjectModal: function() {
      console.log("where")
      this.isProjectModal = false;
    },
    openpopup: function() {
      this.closeProjectModal;
      console.log("here")
      this.isProjectModal = true;
    }
  }
});
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
      return {headerTitle: "", columnsData: this.columnsWeek, rowsData: this.rowsWeek, optionsData: this.optionsWeek, showElement: false, showSell: false, showBuy: false, showGraph: false,
        columnsWeek: [{
            'type': 'string',
            'label': 'Days'
        }, {
            'type': 'number',
            'label': 'Worth'
        }],
        rowsWeek: [],
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
                minValue: 0,
                maxValue: 1
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
        rowsMonth: [],
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
                minValue: 0,
                maxValue: 1
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
        rowsYear: [],
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
                minValue: 0,
                maxValue: 1
            },
            width: 900,
            height: 400,
            linearType: 'function',
        },


      };
    },
    methods: {
      weekly: function() {
        this.showGraph=true;
        self=this;
        this.headerTitle = "Weekly Performance";

        var url = "/data/week?owner=" +this.author+ "&repo="+this.projectname;
        fetch(url, {
          method: 'GET',
        })
        .then(function(res) {
          if(res.ok) {
            res.json().then(function(data) {
              console.log(data);
              self.rowsWeek=data.data;
              console.log(this.rowsWeek);
              self.columns = "columnWeek";
              self.rows = "rowWeek";
              self.options = "optionWeek";

            }.bind(self));
          }
        }).catch(function(err) {
          console.log("Week Charts Error");
        });
      },
      monthly: function() {
        self=this;
        this.headerTitle = "Monthly Performance";

        var url = "/data/month?owner=" +this.author+ "&repo="+this.projectname;
        fetch(url, {
          method: 'GET',
        })
        .then(function(res) {
          if(res.ok) {
            res.json().then(function(data) {
              console.log(data);
              self.rowsMonth=data.data;
              console.log(this.rowsWeek);
              self.columns = "columnMonth";
              self.rows = "rowMonth";
              self.options = "optionMonth";

            }.bind(self));
          }
        }).catch(function(err) {
          console.log("Month Charts Error");
        });
      },
      yearly: function() {
        self=this;
        this.headerTitle = "Yearly Performance";

        var url = "/data/year?owner=" +this.author+ "&repo="+this.projectname;
        fetch(url, {
          method: 'GET',
        })
        .then(function(res) {
          if(res.ok) {
            res.json().then(function(data) {
              console.log(data);
              self.rowsYear=data.data;
              console.log(this.rowsWeek);
              self.columns = "columnYear";
              self.rows = "rowYear";
              self.options = "optionYear";

            }.bind(self));
          }
        }).catch(function(err) {
          console.log("Year Charts Error");
        });
      },
      showSellModal: function() {
        this.showSell = true;
	      this.showBuy = false;
          this.showElement = false;
      },
      closeSellModal: function() {
        this.showSell = false;
        this.showBuy = false;
        this.showElement = true;
      },
      showBuyModal: function() {
        this.showBuy = true;
        this.showSell = false;
        this.showElement = false;
      },
      closeBuyModal: function() {
        this.showBuy = false;
        this.showSell = false;
        this.showElement = true;
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
        this.showElement = false;
      },
    }
  });

var vm = new Vue({
    el: "#OrderPickContainer",
    data: {
        searchWords: "",
        tableHeader: "Top Trending Projects",
        tableErrorMessage: "",
        projectObj: "",
        user: "Rohan",
        showElement: true,
        showSell: false,
        showBuy: false,
        balanceAmount: 200,
        isBalanceModal: false,
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
        isSellModal: false,
        isBuyModal: false,
        busy: false,
        key: "",
        ownedProjects: [
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "tabler",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Tabler is free and open-source HTML Dashboard UI Kit built on Bootstrap 4",
            Author: "tabler",
            Prices: 400
          },
          {
             Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "winfile",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Original File Manager (winfile) with enhancements",
            Author: "Microsoft",
            Prices: 400
          },
          {
           	Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "Interview-Notebook",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "books: 技术面试需要掌握的基础知识整理，欢迎编辑~",
            Author: "CyC2018",
            Prices: 400
          },
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "whatsapp-web-reveng",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Reverse engineering WhatsAppWeb.",
            Author: "sigalor",
            Prices: 400
          },
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "structured-text-tools",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "structured-text-tools",
            Author: "dbhodan",
            Prices: 400
          },
        ],

        ProjectsLists: [
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "tabler",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Tabler is free and open-source HTML Dashboard UI Kit built on Bootstrap 4",
            Author: "tabler",
            Prices: 400
          },
          {
             Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "winfile",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Original File Manager (winfile) with enhancements",
            Author: "Microsoft",
            Prices: 400
          },
          {
           	Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "Interview-Notebook",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "books: 技术面试需要掌握的基础知识整理，欢迎编辑~",
            Author: "CyC2018",
            Prices: 400
          },
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "whatsapp-web-reveng",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "Reverse engineering WhatsAppWeb.",
            Author: "sigalor",
            Prices: 400
          },
          {
            Icon: "https://www.iconfinder.com/icons/99689/apple_os_icon#size=256",
            ProjectName: "structured-text-tools",
            ProjectURL: "wow",
            OwnerURL: "wowOwn",
            ProjectDescription: "structured-text-tools",
            Author: "dbhodan",
            Prices: 400
          },

        ],
    },

    created: function() {
    },
    methods: {
      search: function() {
        //this.loadMore()
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
                /*setTimeout(() => {
                  for(var i = 0, j = data.items.length; i < j; i++) {
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
                    //console.log("YOOO")
                  }
                  this.busy = false;
                }, 1000);*/
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
              self.tableErrorMessage = "";
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
        //console.log(this.ProjectsLists)
      },
      showBalanceModal: function() {
        this.isBalanceModal = true;
      },

      closeBalanceModal: function() {
        this.isBalanceModal = false;
      },

      closeSellModal: function() {
        this.isSellModal = false;
      },

      closeBuyModal: function() {
        this.isBuyModal = false;
      },
      BacktoHomePage: function() {
	     window.location.href="homePage.html"
	   },
     loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
     }
    }

});

}



/*function search() {
  console.log("search")
}*/
