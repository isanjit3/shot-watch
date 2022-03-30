const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000 || process.env.PORT;
const bodyParser = require('body-parser');

var axios = require("axios").default;

// setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// index page
app.get("/", async (req, res) => {
  res.render("index");
});

// friends page
app.get("/friend", async (req, res) => {
  res.render("friend_list")
});

// profile page
app.get("/profile", async (req, res) => {
  res.render("profile_page")
});

// shot counter page
app.get("/shot-counter", async (req, res) => {
  res.render("shot_counter")
});

/*
API CALLS
*/
// gets user selected drink 
app.post("/get-drink", async (req, res, drink) => {
  var alc = req.body.drink
  console.log(alc)
  var uri = 'https://www.thecocktaildb.com/api/json/v1/1/search.php' + '?s=' + alc

  axios.get(uri, {
    headers: {
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'a238715b31msh1be3143a4b4af8fp17f58cjsn63efa662d1c8'
    }
  }).then(res => {
      console.log(res.data.drinks)
      for(al in res.data.drinks) {
        //Call different API MAYBE
        console.log(res.data.drinks[al].strDrinkThumb)
      }
      console.log(`statusCode: ${res.status}`)
    }).catch(error => {
      console.error(error)
    });
});

// adds user to firebase database
app.post("/add-user", async (req, res) => {
  addUser(req.body).then(() => {
    res.status(200);
  })
  .catch((error) => {
    res.status(500);
    console.log(error);
  });
});

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Hackathon Template listening at port: ${PORT}`);
});
