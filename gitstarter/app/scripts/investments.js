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
        columns: [{
            'type': 'string',
            'label': 'Date'
        }, {
            'type': 'number',
            'label': 'Value'
        }],
        rows: [
        ],
        options: {
            title: '',
            hAxis: {
                title: '',
                minValue: '',
                maxValue: ''
            },
            vAxis: {
                title: '',
                minValue: 0,
                maxValue: 1
            },
            height: 400,
            curveType: 'function'
        },
        username: "",
        balance: 0,
        avatar: ""
      }
    },
    created() {
      const self = this;
      this.$on('redrawChart', function() {
        this.$refs.performanceChart.drawChart();
      });
      fetch("/user?user=" + this.username, {credentials: 'same-origin'}).then(function(response) {
        console.log(response);
        return repsonse.json();
      }).then(function(json) {
        console.log(json);
        this.avatar = json.avatar_url;
      }.bind(this)).catch(function(err) {
        console.log(err);
      });
      fetch("/balance", {credentials: 'same-origin'}).then(function(response) {
        console.log(response);
        return response.json();
      }).then(function(json) {
        console.log(json);
        this.username = json.rows[0].username;
        this.balance = json.rows[0].balance;
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
    }
  });

  jQuery(window).resize(function () {
    app.$emit('redrawChart');
  });
}
