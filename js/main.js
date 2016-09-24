$(function() {
// Добавляем модель в коллекцию

// Создаём представление нашего списка книг. Список выводится на экран

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



	
});
//console.log(BooksApp);



