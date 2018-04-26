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
        	console.log("reached here");
        	console.log(json.rows.length);
        	var r = new Object();
        	r.Timestamp = new Date(json.rows[i].timestamp);
        	console.log(r.Timestamp);
        	r.Owner = json.rows[i].owner;
        	console.log(r.Owner);
        	r.Repo = json.rows[i].repo;
        	console.log(r.Repo);
        	r.RemainingBalance = json.rows[i].balance;
        	r.ValueDifference = json.rows[i].new_value - json.rows[i].previous_value;
        	console.log(r.ValueDifference);
        	this.items.push(r);
        }
        console.log(items);
      }.bind(this)).catch(function(err) {
        console.log(err);
      });
     }
	});
}