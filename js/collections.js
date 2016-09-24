// Коллекция книг
$(function() {
BooksApp.Collections.Books = Backbone.Collection.extend({model: BooksApp.Models.Book,
url: 'php/index.php',
//initialize: ''
});

});