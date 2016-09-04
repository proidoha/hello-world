$( function() {

window.BooksApp = {
	Models: {},
	Views: {},
	Collections: {},
	Helpers: {},
	Router: {}
};
 
 // Хелпер шаблона
	BooksApp.Helpers.template = function(selector) {
return _.template($(selector).html());

	};

// Модель Books

BooksApp.Models.Book =  Backbone.Model.extend({
	defaults:{name: 'Название книги', year: 2016, pages: 350, author: 'Имя автора'},
validate: function (attrs, options) {

if (attrs.year < 2000) { return 'Вы пытаетесь ввести неверный год издания книги!';} 

else if (! $.trim(attrs.name) || attrs.name.length < 2) {return 'Значение названия книги не может быть пустым!'}
},
//events: [{''}]
});


// Вид одной книги

BooksApp.Views.book = Backbone.View.extend({
	tagName: "li",
	className: 'one-book',
	template: BooksApp.Helpers.template('#booksTpl'),
	initialize: function() {
this.model.on('change', this.render, this);

this.model.on('invalid', this.invalidFunct, this);

this.model.on('destroy', this.remove, this);
   
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

this.model.set('name', newTitle, {validate: true});	
	},
	destroy: function () {

this.model.destroy();


	},
remove: function() {

this.$el.remove();
},
	invalidFunct: function(model, error) {
		alert(error);

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
	}	
	});





// Коллекция книг

BooksApp.Collections.Books = Backbone.Collection.extend({model: BooksApp.Models.Book});


window.books = new BooksApp.Collections.Books([
{name: 'Планета обезьян', author: 'Пьер Буль', year: 2001},
{author: 'Михаил Булгаков', name: 'Мастер и Маргарита', pages: 650},
{author: 'Пётр Алешковский', name: 'Крепость', year: 2014, pages: 860}
	]);

// Добавляем модель в коллекцию

// Создаём представление нашего списка книг. Список выводится на экран

var booksV = new BooksApp.Views.Books({collection: books});

var block = $('.content');
	
$(block).append(booksV.render().el);

//анонимная функция

//console.log(BooksApp);

BooksApp.Views.AddBook = Backbone.View.extend({
	el: "#addBook",
	initialize: function() {
	return this;	
	},
	validate: function (attrs) {
		//console.log(attrs);
	if (!$.trim(attrs.name) ){
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
var newBook =  new BooksApp.Models.Book({name: newBookTitle});

this.validate(newBook.toJSON());

if (!this.isValid) { this.invalid();
return false;
}

this.collection.add(newBook);

//console.log(books.toJSON());
return this;
},
invalid: function () {
alert(this.validationError);
}
});


window.addBook =  new BooksApp.Views.AddBook({collection: books});

// Роутер

BooksApp.Router = Backbone.Router.extend({
routes: {
	'': 'index',
	'read': 'read',
	'page/:id': 'page',
	'search/:query': 'search',
	"special/:id" : 'special',
	'*word' : 'default',
	

},
index: function () {
	console.log('Индексный роутер!');
},
read: function () {
	console.log('Роут read');
},
page: function (id) {
console.log('Роут page ' + id);
},
search: function (query) {
console.log('Поиск ' + query);

},
default: function(word) {

alert('Такой страницы не существует! Вы пытались найти: ' +  word);
},

special: function (id) {
console.log(id);

}
});

window.route = new BooksApp.Router();

Backbone.history.start();

//route.navigate('page/2', {replace: true});

//console.log('Даёшь git!');

});

