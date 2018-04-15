function openNav() {
    document.getElementById("mySidenav").style.width = "290px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}




function onLoad() {


new Vue({
    el: "#OrderPickContainer",
    data: {
        searchWords: "",
        tableHeader: "Top Trending Projects",
        isBalanceModal: false,
        isSellModal: false,
        isBuyModal: false,
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
    methods: {
      search: function() {
        //this.ProjectsLists = new Array();
        //console.log(this.ProjectsLists)
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
              //console.log(data.items)
              if(data.length === 0) {
                //this.ProjectsLists = "No search results found"
              }
              else {
                //console.log(data.name)
                //console.log(data.items.length)
                console.log(data.items[0])
                //var results = new Array();
                for(var i = 0; i < data.items.length; i++) {
                  var obj = new Object();
                  obj.Icon = data.items[i].owner.avatar_url;
                  console.log(obj.Icon);
                  obj.ProjectName = data.items[i].name;
                  obj.ProjectURL = data.items[i].html_url;
                  obj.OwnerURL = data.items[i].owner.html_url;
                  //console.log(obj.ProjectURL)
                  obj.ProjectDescription = data.items[i].description;
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
        console.log(results)
        this.ProjectsLists = results;
        console.log(this.ProjectsLists)
      },
      showBalanceModal: function() {
        this.isBalanceModal = true;
      },

      showSellModal: function() {
        this.isSellModal = true;
      },

      showBuyModal: function() {
        this.isBuyModal = true;
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
    }

});

}



/*function search() {
  console.log("search")
}*/

