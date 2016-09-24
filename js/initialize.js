$(function() {
window.books = new BooksApp.Collections.Books();


books.fetch();

var booksV = new BooksApp.Views.Books({collection: books});

var block = $('.content');
	
$(block).append(booksV.render().el);

window.addBook =  new BooksApp.Views.AddBook({collection: books}); 

});