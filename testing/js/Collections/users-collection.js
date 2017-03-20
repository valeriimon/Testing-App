window.UserCollection = Backbone.Collection.extend({
	model: UserModel,
	url: "https://randomuser.me/api/?results=10",
	 
	parse: function(data, options){
	 	this.push(data.results);
	 	return this.models;
	}
});


window.collection = new UserCollection();
collection.fetch();



