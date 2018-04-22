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
  data: function() {
    return {isProjectModal: false};
  },
  methods: {
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
    data: function() {
      return {showElement: true, showSell: false, showBuy: false, showGraph: false,
        columns: [{
            'type': 'string',
            'label': 'Year'
        }, {
            'type': 'number',
            'label': 'Sales'
        }, {
            'type': 'number',
            'label': 'Expenses'
        }],
        rows: [
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ],
        options: {
            title: 'Company Performance',
            hAxis: {
                title: 'Year',
                minValue: '2004',
                maxValue: '2007'
            },
            vAxis: {
                title: '',
                minValue: 300,
                maxValue: 1200
            },
            width: 900,
            height: 500,
            curveType: 'function'
        }

      };
    },
    methods: {
      showSellModal: function() {
        this.showSell = true;
	this.showBuy = false;
        this.showElement = true;
      },
      showBuyModal: function() {
        this.showBuy = true;
        this.showSell = false;
        this.showElement = true;
      },

      showGraphModal: function() {
        console.log("hello");
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
      }
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
      this.user = "Wassup"
      this.balanceAmount = 500
      let self = this
      var results = new Array();
      var url = "https://api.github.com/search/repositories?q=hello&sort=stars&order=desc";
      fetch(url, {
        method: 'GET',
      })
      .then(function(res) {
        if(res.ok) {
            res.json().then(function(data) {
              //console.log(data.items)
             // console.log(data)
              //console.log(data.items.length)
              //console.log(data.items.length == 0)
              if(data.items.length == 0 || data.items[0] == undefined) {
                //this.ProjectsLists = "No search results found"
                //console.log("reached here");
                self.tableErrorMessage = "No search results found"
                self.tableHeader = "Top Trending Projects"
                //console.log(this.tableErrorMessage)

              }
              else {
                //console.log(data.name)
                //console.log(data.items.length)
                self.tableErrorMessage = "";
                //console.log(data.items[0])
                //var results = new Array();
                for(var i = 0; i < data.items.length; i++) {
                  var obj = new Object();
                  obj.Icon = data.items[i].owner.avatar_url;
                 //console.log(obj.Icon);
                  obj.ProjectName = data.items[i].name;
                  obj.ProjectURL = data.items[i].html_url;
                  obj.OwnerURL = data.items[i].owner.html_url;
                  //console.log(obj.ProjectURL)
                  //console.log(data.items[i].description.length);
                  if(data.items[i].description != null && data.items[i].description.length > 300) {
                    obj.ProjectDescription = data.items[i].description.substring(0, 300) + "...";
                  }
                  else {
                    obj.ProjectDescription = data.items[i].description;
                  }
                  obj.Author = data.items[i].owner.login;
                  obj.Prices = 200;
                  //console.log(obj);
                  results.push(obj);
                }
                //this.ProjectLists.push(data.name)
              }
            }.bind(this));
          }
      });
      this.ProjectsLists = results;
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
