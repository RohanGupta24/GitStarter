function onLoad() {

new Vue({
    el: "#OrderPickContainer",
    data: {
        search: "",
        projectsList: [
          {
            icon: "ICON",
            projectName: "tabler",
            projectDescription: "Tabler is free and open-source HTML Dashboard UI Kit built on Bootstrap 4",
            author: "tabler",
            prices: 400
          },
        ],
    }
});

}
