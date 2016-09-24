// Вид одной книги
$(function() {
BooksApp.Views.book = Backbone.View.extend({
	tagName: "li",
	className: 'one-book',
	template: BooksApp.Helpers.template('#booksTpl'),
	initialize: function() {
//this.model.on('change', this.render, this);

this.model.on('invalid', this.invalidFunct, this);

this.model.on('destroy', this.remove, this);

this.model.on('change', this.changeModel, this);
   
	},
	render: function() {
		
var json = this.model.toJSON();

this.$el.html( this.template(json));
return this;		
	},
		
	// Прикрепляем события к представлению
	events: {
	'click button[name=save]': 'changeTitle',
	'click button[name=delete]': 'destroy'	
	},
	changeTitle: function() {
var newTitle = this.$('input[name=title]').val();
console.log(this.model);
this.model.set('title', newTitle, {validate: true});	

/*this.model.save({title: this.model.escape('title'), id: this.model.id},{patch: true, wait: true, success: function(model, response) {
console.log('Ура! ' + response);
},
error: function(model, response) {
console.log(response);

}
});*/

return this;
	},
	destroy: function () {

this.model.destroy();


	},
remove: function() {

this.$el.remove();
},
	invalidFunct: function(model, error) {
		alert(error);

	},

	changeModel: function() {
this.model.save(this.model.toJSON(),{success: function(model, response) {
console.log('Ура! ' + response);
},
error: function(model, response) {
console.log(response);

}
});

this.render();

return this;
	}
});

// Вид списка книг

BooksApp.Views.Books = Backbone.View.extend({
	tagName: 'ul',
	className: 'books',
initialize: function () {

this.collection.on('add', this.addOne, this);

return this;
},
	render: function() {
this.collection.each(function(book) {
this.addOne(book);
}, this);


return this;
	},

	addOne: function(book) {
var bookView = new BooksApp.Views.book({model: book});

this.$el.append(bookView.render().el);

return this;
	},
/*add: function(book) {
var bookView = new BooksApp.Views.book({model: book});

this.$el.append(bookView.render().el);

//bookView.model();

return this;


}*/

	});

BooksApp.Views.AddBook = Backbone.View.extend({
	el: "#addBook",
	initialize: function() {
	return this;	
	},
	validate: function (attrs) {
		//console.log(attrs);
	if (!$.trim(attrs.title) ){
this.isValid = false;
this.validationError =  'Вы ввели некорректное название книги!';
	return this.validationError;
}

else this.isValid = true;
	},
events: {
'submit': 'submit',
},
submit: function(event) {
event.preventDefault();
var newBookTitle = this.$('input[name=newTitle]').val();

console.log(newBookTitle);

var newBook =  new BooksApp.Models.Book({title: newBookTitle});

this.validate(newBook.toJSON());

if (!this.isValid) { this.invalid();
return false;
}

this.collection.create(newBook);

//console.log(this.collection);


//newBook.save();

//console.log(books.toJSON());
return this;
},
invalid: function () {
alert(this.validationError);
}
});

});