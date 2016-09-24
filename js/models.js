// Модель Books
$(function() {
BooksApp.Models.Book =  Backbone.Model.extend({
	defaults:{title: 'Название книги', year: 2016, pages: 350, author: 'Имя автора'},
	urlRoot: 'php/index.php',
validate: function (attrs, options) {

if (attrs.year < 2000) { return 'Вы пытаетесь ввести неверный год издания книги!';} 

else if (! $.trim(attrs.title) || attrs.title.length < 2) {return 'Значение названия книги не может быть пустым!'}
},
urlRoot: 'php/index.php'
//events: [{''}]
});


});