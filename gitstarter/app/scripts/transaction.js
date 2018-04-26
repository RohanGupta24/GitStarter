function onLoad() {
	new Vue({
    el: "#tableResults",
    data: {items: []},
    created: function() {
      fetch("/activities", {credentials: 'same-origin'}).then(function(response) {
        console.log(response);
        return response.json();
      }).then(function(json) {
        console.log(json);
        for(var i = 0; i < json.rows.length; i++) {
        	this.items.Timestamp = new Date(json.rows[i].timestamp);
        	this.items.Owner = json.rows[i].owner;
        	this.items.Repo = json.rows[i].repo;
        	this.items.Balance = json.rows[i].balance;
        	this.items.Difference = json.rows[i].new_value - json.rows[i].previous_value;
        }
      }.bind(this)).catch(function(err) {
        console.log(err);
      });
     }
	});
}