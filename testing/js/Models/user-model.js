window.template = function(id){
		return  _.template($("#"+id).html());
	};

window.UserModel = Backbone.Model.extend({
	urlRoot: 'https://randomuser.me/api/?results=10',
	
	defaults: {
		
	}

});