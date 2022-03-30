import { use } from "express/lib/application";
import res from "express/lib/response";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

var axios = require("axios").default;

// setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCRAltCRD0ZGbOp1ub8VEWnfjBt4ewvWGg",
  authDomain: "shot-watch.firebaseapp.com",
  projectId: "shot-watch",
  storageBucket: "shot-watch.appspot.com",
  messagingSenderId: "514081168240",
  appId: "1:514081168240:web:83d142b62e196da42c4db5",
  measurementId: "G-ZG9JEK6XYK"
};

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
    res.status(200);
    console.log(error);
  });
});

/*
HELPER FUNCTIONS
*/
// add-user helper
function addUser(user) {
  var ref = datbase.ref("users/" + user.userId);
  var status = 200;
  var err;

  ref.set({
    name: user.name,
    gender: user.gender,
    weight: user.gender,
    drinkTimestamps: user.drinkTimestamps,
    timeSinceLastDrink: user.timeSinceLastDrink,
    status: user.status,
    bac: user.bac,
    drunk: user.drunk,
  })
};

//update-user helper
function updateUser(user) {

}

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Hackathon Template listening at port: ${PORT}`);
});
