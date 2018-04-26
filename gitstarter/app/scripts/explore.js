function bodyOnload() {
  Vue.component("project-cell", {
    template: "#project-template",
    props: ["icon", "ownerurl", "author", "projecturl", "projectname", "projectdescription", "price", "previousvalue", "valuebought", "index"],

    data: function() {
      return {
        headerTitle: "",
        columnsData: this.columnsWeek,
        rowsData: this.rowsWeek,
        optionsData: this.optionsWeek,
        showElement: true,
        showSell: false,
        showBuy: false,
      };
    },
    methods: {
      getData: function(author, projectname, price, previousvalue, valuebought) {
        this.$emit('get-project-data', author, projectname, price, previousvalue, valuebought);
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
        this.$root.weekly();
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

  Vue.use(VueCharts);

  var app = new Vue({
    el: "#app",
    data: function () {
      return {
        avatar: "",
        profile: "",
        projectsList: [],
        investmentsList: [],
        topTrendingList: [],
        columnsData: this.columnsWeek, rowsData: this.rowsWeek, optionsData: this.optionsWeek,
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
              height: 400,
              linearType: 'function',
          },
        username: "",
        invested: 0,
        value_bought: 0,
        value_sold: 0,
        sellDisabled: true,
        buyDisabled: true,
        buyInputDisabled: true,
        searchWords: "",
        author: "",
        projectname: "",
        performance: "",
        performanceTab: 0,
        tableHeader: "",
        projectPrice: 0,
        previousValue: 0,
        showBuyModal: false,
        showSellModal: false
      }
    },
    created() {
      this.columnsData = this.columnsWeek;
      this.rowsData = this.rowsWeek;
      this.optionsData = this.optionsWeek;

      const self = this;
      this.$on('redrawChart', function() {
        this.$refs.performanceChart.drawChart();
      });

      fetch("/balance", {credentials: 'same-origin'}).then(function(response) {
        console.log(response);
        return response.json();
      }).then(function(json) {
        console.log(json);
        this.username = json.rows[0].username;
        this.balance = json.rows[0].balance;
        return fetch("/user?user=" + this.username, {credentials: 'same-origin'});
      }.bind(this)).then(function(response) {
        console.log(response);
        return response.json();
      }).then(function(json) {
        console.log(json);
        this.avatar = json.avatar_url;
        this.profile = json.html_url;
      }.bind(this)).catch(function(err) {
        console.log(err);
      });

      fetch("/investments", {credentials: 'same-origin'}).then(function(response) {
        return response.json();
      }).then(function(json) {
        var projects = [];
        for (var i = 0; i < json.rows.length; i++) {
          var investment = new Object();
          investment.ProjectName = json.rows[i].repo;
          investment.Author = json.rows[i].owner;
          investment.value_bought = json.rows[i].value_bought;
          investment.previous_value = json.rows[i].value;
          projects.push(investment);
        }
        if (projects.length < 1) {
          return;
        }
        this.investmentsList = projects;
        var promises = [];
        for (var i = 0; i < projects.length; i++) {
          promises.push(fetch("https://api.github.com/repos/" + projects[i].Author + "/" + projects[i].ProjectName));
          promises.push(fetch("/value?repo=" + projects[i].ProjectName + "&owner=" + projects[i].Author, {credentials: 'same-origin'}));
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
             for (var j = 0; j < this.investmentsList.length; j++) {
               if (this.investmentsList[j].ProjectName == json[i].repo && this.investmentsList[j].Author == json[i].owner) {
                 Vue.set(this.investmentsList[j], 'Prices', json[i].currentValue);
               }
             }
           } else if (json[i].name != null && json[i].owner.login != null) {
              for (var j = 0; j < this.investmentsList.length; j++) {
                if (this.investmentsList[j].ProjectName == json[i].name && this.investmentsList[j].Author == json[i].owner.login) {
                  Vue.set(this.investmentsList[j], 'Icon', json[i].owner.avatar_url);
                  Vue.set(this.investmentsList[j], 'ProjectURL', json[i].html_url);
                  Vue.set(this.investmentsList[j], 'OwnerURL', json[i].owner.html_url);
                  Vue.set(this.investmentsList[j], 'ProjectDescription', json[i].description);
                }
              }
            } else {
              Vue.set(this.investmentsList[i], 'Prices', 'N/A');
            }
          }
        }.bind(this)).catch(function(err) {
          console.log(err);
        });
      }.bind(this)).catch(function(err) {
        console.log(err);
      });

      var promises = fetch("/trending").then(function(response) {
        return response.json();
      }).then(function(json) {
        this.topTrendingList = json.projectsList;
        this.projectsList = json.projectsList;
        console.log(this.projectsList);
        var projects = json.projectsList;
        var promises = [];
        for (var i = 0; i < projects.length; i++) {
          promises.push(fetch("https://api.github.com/repos/" + projects[i].Author + "/" + projects[i].ProjectName));
          promises.push(fetch("/value?repo=" + projects[i].ProjectName + "&owner=" + projects[i].Author, {credentials: 'same-origin'}));
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
                 if (this.projectsList[j] == this.topTrendingList[j]) {
                   Vue.set(this.projectsList[j], 'Prices', json[i].currentValue);
                 }
               }
             }
           } else if (json[i].name != null && json[i].owner.login != null) {
              for (var j = 0; j < this.topTrendingList.length; j++) {
                if (this.topTrendingList[j].ProjectName == json[i].name && this.topTrendingList[j].Author == json[i].owner.login) {
                  Vue.set(this.topTrendingList[j], 'Icon', json[i].owner.avatar_url);
                  Vue.set(this.topTrendingList[j], 'ProjectURL', json[i].html_url);
                  Vue.set(this.topTrendingList[j], 'OwnerURL', json[i].owner.html_url);
                  if (this.projectsList[j] == this.topTrendingList[j]) {
                    Vue.set(this.projectsList[j], 'Icon', json[i].owner.avatar_url);
                    Vue.set(this.projectsList[j], 'ProjectURL', json[i].html_url);
                    Vue.set(this.projectsList[j], 'OwnerURL', json[i].owner.html_url);
                  }
                }
              }
            } else {
              Vue.set(this.projectsList[i], 'Prices', 'N/A');
            }
          }
        }.bind(this)).catch(function(err) {
          console.log(err);
        });
        return promises
      }.bind(this)).catch(function(err) {
        console.log(err);
      });
    },
    methods: {
      weekly: function() {
        if (this.author == null || this.projectname == null) {
          return;
        }
        self=this;
        this.performance = "Performance for " + this.projectname;
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
        if (this.author == null || this.projectname == null) {
          return;
        }
        self=this;
        this.performance = "Performance for " + this.projectname;
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
        if (this.author == null || this.projectname == null) {
          return;
        }
        self=this;
        this.performance = "Performance for " + this.projectname;
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
      searchProjects: function() {
        let self = this
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
              var results = new Array();
              if(data.items.length == 0 || data.items[0] == undefined) {
                //SHOW TOP TRENDING PROJECTS HERE
                // self.tableErrorMessage = "No search results found"
                self.tableHeader = "Top Trending Projects"
                results = self.topTrendingList;
              }
              else {
                // self.tableErrorMessage = "";
                for(var i = 0; i < Math.min(10, data.items.length); i++) {
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
                  results.push(obj);
                }
              }

              self.projectsList = results;

              var promises = [];
              for (var i = 0; i < results.length; i++) {
                promises.push(fetch("/value?repo=" + results[i].ProjectName + "&owner=" + results[i].Author, {credentials: 'same-origin'}));
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
                   for (var j = 0; j < self.projectsList.length; j++) {
                     if (self.projectsList[j].ProjectName == json[i].repo && self.projectsList[j].Author == json[i].owner) {
                       Vue.set(self.projectsList[j], 'Prices', json[i].currentValue);
                     }
                   }
                 } else {
                   Vue.set(self.projectsList[i], 'Prices', 'N/A');
                 }
                }
              }.bind(this)).catch(function(err) {
                console.log(err);
              });
            }.bind(this));
          }
          else {
            if(res.status == 422) {
              //SHOW TOP TRENDING PROJECTS HERE
              // self.tableErrorMessage = ""
              self.projectsList = self.topTrendingList;
            }
            else if(res.status == 403) {
              //SHOW TOP TRENDING PROJECTS
              // self.tableErrorMessage = "Please try again"
              self.projectsList = self.topTrendingList;
            }
          }
        });
        if(this.searchWords.length == 0) {
          this.tableHeader = "Top Trending Projects"
          self.projectsList = self.topTrendingList;
        }
        // this.projectsList = results;

      },
      getProjectData: function(author, projectname, price, previousvalue, valuebought) {
        for (var i = 0; i < this.investmentsList.length; i++) {
          if (this.investmentsList[i].Author == author && this.investmentsList[i].ProjectName == projectname) {
            this.invested = this.investmentsList[i].value_bought;
            this.previousValue = this.investmentsList[i].previous_value;
            break;
          }
        }
        console.log(price);
        console.log(previousvalue);
        console.log(valuebought);
        this.author = author;
        this.projectname = projectname;
        this.performanceTab = 0;
        this.weekly();
        this.projectPrice = price;
        this.buyInputDisabled = false;
        this.buyDisabled = false;
        if (this.invested > 0.1) {
          this.sellDisabled = false;
        }
      },
      buyProject: function() {
        fetch("/invest", {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            value : this.projectPrice,
            value_bought : this.value_bought,
            repo : this.projectname,
            owner : this.author,
            previous_value : this.previousValue
          })
        }).then(function(response) {
          console.log(response);
        }).catch(function(err) {
          console.log(err);
        });
        this.showBuyModal = false;
      },
      rejectBuy: function() {
        this.showBuyModal = false;
      },
      sellProject: function() {
        fetch("/sell", {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            value : this.projectPrice,
            value_sold : this.value_sold,
            repo : this.projectname,
            owner : this.author
          })
        }).then(function(response) {
          console.log(response);
        }).catch(function(err) {
          console.log(err);
        });
        this.showSellModal = false;
      },
      rejectSell: function() {
        this.showSellModal = false;
      }
    },
    computed: {
      buy_value: {
        get: function() {
          return this.value_bought;
        },
        set: function(newValue) {
          this.value_bought = newValue;
          if (this.projectPrice < 1 || this.value_bought < 1) {
            this.buyDisabled = true;
          } else {
            this.buyDisabled = false;
          }
        }
      },
      sell_value: {
        get: function() {
          return this.value_sold;
        },
        set: function(newValue) {
          this.value_sold = newValue;
          if (this.value_sold > this.invested && this.value_sold < 0.1) {
            this.sellDisabled = true;
          } else {
            this.sellDisabled = false;
          }
        }
      },
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
    }
  });

  jQuery(window).resize(function () {
    app.$emit('redrawChart');
  });
}
