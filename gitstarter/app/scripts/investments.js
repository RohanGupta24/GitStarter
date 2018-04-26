function bodyOnload() {
  Vue.component("project-cell", {
    template: "#project-template",
    props: ["icon", "ownerurl", "author", "projecturl", "projectname", "projectdescription", "price", "previousvalue", "valuebought", "index"],

    created: function() {
    },
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
        projectsList: [],
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
        balance: 0,
        avatar: "",
        profile: "",
        invested: 0,
        value_bought: 0,
        value_sold: 0,
        sellDisabled: true,
        buyDisabled: true,
        buyInputDisabled: true,
        author: "",
        projectname: "",
        performance: "",
        performanceTab: 0,
        projectPrice: 0,
        previousValue: 0,
        showBuyModal: false,
        showSellModal: false,
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
        this.projectsList = projects;
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
             for (var j = 0; j < this.projectsList.length; j++) {
               if (this.projectsList[j].ProjectName == json[i].repo && this.projectsList[j].Author == json[i].owner) {
                 Vue.set(this.projectsList[j], 'Prices', json[i].currentValue);
               }
             }
           } else if (json[i].name != null && json[i].owner.login != null) {
              for (var j = 0; j < this.projectsList.length; j++) {
                if (this.projectsList[j].ProjectName == json[i].name && this.projectsList[j].Author == json[i].owner.login) {
                  Vue.set(this.projectsList[j], 'Icon', json[i].owner.avatar_url);
                  Vue.set(this.projectsList[j], 'ProjectURL', json[i].html_url);
                  Vue.set(this.projectsList[j], 'OwnerURL', json[i].owner.html_url);
                  Vue.set(this.projectsList[j], 'ProjectDescription', json[i].description);
                }
              }
            } else {
              Vue.set(this.projectsList[i], 'Prices', 'N/A');
            }
          }
        }.bind(this)).catch(function(err) {
          console.log(err);
        });
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
      getProjectData: function(author, projectname, price, previousvalue, valuebought) {
        console.log(price);
        console.log(previousvalue);
        console.log(valuebought);
        this.buyInputDisabled = false;
        this.invested = valuebought;
        this.previousValue = previousvalue;
        this.author = author;
        this.projectname = projectname;
        this.performanceTab = 0;
        this.weekly();
        this.projectPrice = price;
        this.buyDisabled = false;
        if (this.invested > 0.1) {
          this.sellDisabled = false;
        }
      },
      buyProject: function() {
        if (this.buy_value < 0.1) {
          this.buyDisabled = true;
          return;
        }
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
          return response.json();
        }).then(function(response) {
          this.balance = response.balance;
        }.bind(this)).catch(function(err) {
          console.log(err);
        });
        this.showBuyModal = false;
      },
      rejectBuy: function() {
        this.showBuyModal = false;
      },
      sellProject: function() {
        if (this.sell_value < 0.1) {
          this.sellDisabled = true;
          return;
        }
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
          return response.json();
        }).then(function(response) {
          this.balance = response.balance;
        }.bind(this)).catch(function(err) {
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
          if (this.projectPrice < 1 || this.value_bought < 1 || this.value_bought > this.balance) {
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
          if (this.value_sold > this.invested || this.value_sold < 0.1) {
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
