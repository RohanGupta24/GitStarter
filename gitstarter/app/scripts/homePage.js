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
      showBuyModal: function() {
        this.showBuy = true;
        this.showSell = false;
        this.showElement = false;
      },

      showGraphModal: function() {
        this.showGraph = true;
        this.weekly();
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
        topTrendingList: [],
        ProjectsLists: [],
    },
    created: function() {
      var promises = fetch("/trending").then(function(response) {
        return response.json();
      }).then(function(json) {
        this.topTrendingList = json.projectsList;
        this.ProjectsLists = json.projectsList;
        console.log(this.ProjectsLists);
        var projects = json.projectsList;
        var promises = [];
        for (var i = 0; i < projects.length; i++) {
          promises.push(fetch("https://api.github.com/repos/" + projects[i].Author + "/" + projects[i].ProjectName));
          promises.push(fetch("/value?repo=" + projects[i].ProjectName + "&owner=" + projects[i].Author));
        }
        Promise.all(promises).then(function(response) {
          console.log(response)
          var responses = [];
          for (var i = 0; i < response.length; i++) {
            responses.push(response[i].json());
          }
          return Promise.all(responses);
        }).then(function(json) {
          console.log(json);
          for (var i = 0; i < json.length; i++) {
            if (json[i].repo != null && json[i].owner != null) {
             for (var j = 0; j < this.topTrendingList.length; j++) {
               if (this.topTrendingList[j].ProjectName == json[i].repo && this.topTrendingList[j].Author == json[i].owner) {
                 Vue.set(this.topTrendingList[j], 'Prices', json[i].currentValue);
                 if (this.ProjectsLists[j] == this.topTrendingList[j]) {
                   Vue.set(this.ProjectsLists[j], 'Prices', json[i].currentValue);
                 }
               }
             }
           } else if (json[i].name != null && json[i].owner.login != null) {
              for (var j = 0; j < this.topTrendingList.length; j++) {
                if (this.topTrendingList[j].ProjectName == json[i].name && this.topTrendingList[j].Author == json[i].owner.login) {
                  Vue.set(this.topTrendingList[j], 'Icon', json[i].owner.avatar_url);
                  Vue.set(this.topTrendingList[j], 'ProjectURL', json[i].html_url);
                  Vue.set(this.topTrendingList[j], 'OwnerURL', json[i].owner.html_url);
                  if (this.ProjectsLists[j] == this.topTrendingList[j]) {
                    Vue.set(this.ProjectsLists[j], 'Icon', json[i].owner.avatar_url);
                    Vue.set(this.ProjectsLists[j], 'ProjectURL', json[i].html_url);
                    Vue.set(this.ProjectsLists[j], 'OwnerURL', json[i].owner.html_url);
                  }
                }
              }
            }
          }
        }.bind(this)).catch(function(err) {
          console.log(err);
        });
        return promises
      }.bind(this)).catch(function(err) {
        console.log(err);
      });
      console.log(promises);

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
                results = self.topTrendingList;
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
              results = self.topTrendingList;
            }
            else if(res.status == 403) {
              //SHOW TOP TRENDING PROJECTS
              self.tableErrorMessage = "Please try again"
              self.topTrendingList;
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
