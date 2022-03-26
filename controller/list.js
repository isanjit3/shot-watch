var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'www.thecocktaildb.com/api/json/v1/1/search.php',
  params: {s: drink},
  headers: {
    'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    'X-RapidAPI-Key': 'a238715b31msh1be3143a4b4af8fp17f58cjsn63efa662d1c8'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});