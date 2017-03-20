window.App = Backbone.View.extend({
	el:"body",

	initialize: function(){
		this.render();
	},

	events: {
		"click tr": "toggle",
	},

	toggle: function(e){

		var element = $(e.target).parent().next();
		
		if ( element.attr("data-value") == "false" ){
			element.hide();
			$(e.target).parent().children(".minus").attr("class", "plus");
			element.attr("data-value", "true");
		
		} else if ( element.attr("data-value") == "true" ){
			element.show();
			$(e.target).parent().children(".plus").attr("class", "minus");
			element.attr("data-value", "false");
			element.siblings(".hide").hide().attr("data-value", "true");
			$(e.target).parent().siblings('tr:not([class="hide"])').children(".minus").attr("class", "plus");
		}
		
	},

	popup: function(arr){
		
		var gender = [];
		var genderMale = [];
		var genderFemale = [];
		
		for(var i in arr){
			
			gender.push(arr[i].gender)
			
			if ( arr[i].gender=="male" ) {
				genderMale.push(arr[i].gender);
			} else {
				genderFemale.push(arr[i].gender);
			}
		}
		// var res = genderFemale.length / gender.length *100;
		// var res1 = genderMale.length / gender.length *100;
		var res = genderFemale.length;
		var res1 = genderMale.length;
		
		google.charts.load('current', {'packages':['corechart']});
      	google.charts.setOnLoadCallback(drawChart);

    	function drawChart() {

	        var data = google.visualization.arrayToDataTable([
	          ['Task', 'Female or male'],
	          ['Female', res],
	          ['Male', res1]
	        ]);

	        var options = {
	          title: 'Gender of users'
	        };

	        var chart = new google.visualization.PieChart(document.querySelector("#container_popup"));

	        chart.draw(data, options);
	    }
	},

	search: function(arr){
		
		$("input").on("input propertychange paste", function(){
			
			var val = $("input").val();
			var result = [];
			
			arr.filter(function(item){
				(item.name.first.includes(val)) ? result.push(item) : console.log(false); 
				
			});
			
			$("tbody").html("");
			
			result.forEach(function(item,i){
				var user = new UserView({model:result[i]});
				console.log(user);
			})
		
		});
		
		$("button.show_all").on("click", function(){
			
			$("tbody").html("");
			
			arr.forEach(function(item, i){
				var userView = new UserView({model: arr[i]});
			})
		
		})
	},

	render: function(){
		
		var attrs = this.collection.models["0"].attributes; 
		var arr = []; 
		
		keys = Object.keys(attrs); 
		
		for( var i = 0, n = keys.length; i < n; i++ ) { 
			var key = keys[i]; 
			arr[key] = attrs[key]; 
		} 
		
		arr.forEach(function(item, i){
			var userView = new UserView({model: arr[i]});
		});

		this.popup(arr);

		this.search(arr);
		
		return this; 
	}
});



setTimeout(function(){
	
	new App({collection:collection});

},1000)

 