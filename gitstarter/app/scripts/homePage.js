function onLoad() {





new Vue({
    el: "#OrderPickContainer",
    data: {
        search: "",
        ProjectsLists: [
          {
            Icon: "ICON",
            ProjectName: "tabler",
            ProjectDescription: "Tabler is free and open-source HTML Dashboard UI Kit built on Bootstrap 4",
            Author: "tabler",
            Prices: 400
          },
          {
             Icon: "ICON",
            ProjectName: "winfile",
            ProjectDescription: "Original File Manager (winfile) with enhancements",
            Author: "Microsoft",
            Prices: 400
          },
          {
           	 Icon: "ICON",
            ProjectName: "Interview-Notebook",
            ProjectDescription: "books: 技术面试需要掌握的基础知识整理，欢迎编辑~",
            Author: "CyC2018",
            Prices: 400
          },
          {
            Icon: "ICON",
            ProjectName: "whatsapp-web-reveng",
            ProjectDescription: "Reverse engineering WhatsAppWeb.",
            Author: "sigalor",
            Prices: 400
          },
          {
            Icon: "ICON",
            ProjectName: "structured-text-tools",
            ProjectDescription: "structured-text-tools",
            Author: "dbhodan",
            Prices: 400
          },

        ],
    }
});

}