window.UserView = Backbone.View.extend({
	el:"tbody",
	tagName:"tr",
	template: template("tmp"),

	initialize: function(){
		this.render();
	},

	render: function(){
		var template = this.template( this.model )
		this.$el.append( template );
		return this;
	}
})