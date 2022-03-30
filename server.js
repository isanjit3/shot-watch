const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000 || process.env.PORT;
const mongoose = require("mongoose");
//const MONGO_URI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const User = require('./models/user');
const bodyParser = require('body-parser');
var axios = require("axios").default;

app.use('/favicon.ico', express.static('public/images/favicon.ico'));

// setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// index page
app.get("/", async (req, res) => {
  //await addUser(); // Create new user on page render
  res.render("index");
});

// page
app.get("/data-display", async (req, res) => {
  // const users = await User.find({})
  res.render("data_display"/*, {users}*/)
});

//page
app.get("/drink-form", async (req, res) => {
  res.render("drink_form")

});

app.post("/get-abv", async (req, res) => {
  var abv = 0
  var uri = 'https://www.thecocktaildb.com/api/json/v1/1/search.php' + '?s=' + alc

  axios.get(uri, {
    headers: {
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'a238715b31msh1be3143a4b4af8fp17f58cjsn63efa662d1c8'
    }
  })
    .then(res => {
      //console.log(res.data.drinks)
      var alcohol = res.data.drinks[1]

      for(ingredient in alcohol) {
        console.log(ingredient.toString().substring(0,7))
        //if(ingredient.substring(0,12))
        /*
        strIng = alcohol + '.' + ingredient + '' + 
        strIng = res.data.drinks[al] + '.' + ingredient + '' + al
        */
       //console.log(ingredient.substring(0,7))

      }
      console.log(`statusCode: ${res.status}`)
    })
    .catch(error => {
      console.error(error)
    });

})


app.post("/get-drink", async (req, res) => {
  var abv = 0
  var uri = 'https://www.thecocktaildb.com/api/json/v1/1/search.php' + '?s=' + req.body.drink

  axios.get(uri, {
    headers: {
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'a238715b31msh1be3143a4b4af8fp17f58cjsn63efa662d1c8'
    }
  })
    .then(res => {
      //console.log(res.data.drinks)
      var sum;
      var pos;
      var alcohol = res.data.drinks[0]
      //console.log(alcohol)
      var counter = 1;
      var cou = 0;
      //console.log(Object.values(alcohol)[1])

      for(val in Object.values(alcohol)){
        if((Object.keys(alcohol)[cou]).toString().substring(0,13) == 'strIngredient') {
          if(val == 'Tequila') {
            pos = counter;



          }
          counter++;
        }
        cou++
        
      }
      
      for(vl in alcohol) {
        console.log(vl)
        if(vl == ('strMeasure' + pos)) {
          sum = alcohol[vl]

        }
      }
      console.log(sum)



    });
  });


/*
      for(ingredient in alcohol) { //each field is ingredient
        console.log(alcohol.ingredient.key)
        if(ingredient.substring(0,13) == 'strIngredient') {
          console.log(res.data.drinks[0].ingredient)
          if(strIng == 'Tequila') {
            console.log(alcohol.strDrink)
          }
          counter++
        }

*/

        /*
        strIng = alcohol + '.' + ingredient + '' + 
        strIng = res.data.drinks[al] + '.' + ingredient + '' + al
        */
       //console.log(ingredient.substring(0,13))

      
    /*
  var alc = req.body.drink
  console.log(alc)
  var uri = 'https://www.thecocktaildb.com/api/json/v1/1/search.php' + '?s=' + alc

  axios.get(uri, {
    headers: {
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
      'X-RapidAPI-Key': 'a238715b31msh1be3143a4b4af8fp17f58cjsn63efa662d1c8'
    }
  })
    .then(res => {
      console.log(res.data.drinks)
      for(al in res.data.drinks) {
        console.log(res.data.drinks[al].strDrinkThumb)
      }
      console.log(`statusCode: ${res.status}`)
    })
    .catch(error => {
      console.error(error)
    });
*/



//page
app.get("/friend", async (req, res) => {
  res.render("friend_list")
});

//page
app.get("/profile", async (req, res) => {
  res.render("profile_page")
});



// add new user to database
app.post("/addUser", async (req, res) => {
  const user = new User(req.body);

  const createdUser = await user.save();

  res.status(200).json(createdUser);
});

// update existing user in database
app.post("/updateUser", async (req, res) => {

  const user = await user.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).exec()

  res.status(200).json(user);
});

app.delete("/deleteUser", async (req, res) => {
  // delete user given id
  // error handling for invalid indexes
});

// Connecting to MongoDB
/*
mongoose.connection.on("connecting", () => {
  console.log(`Connecting to Mongo at ${MONGO_URI}`);
});

mongoose.connection.on("connected", () => {
  console.log("Mongo connection established");
});

mongoose.connection.on("error", (error) => {
  console.log("Mongo connection error", error);
});

try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(`Mongo connection error: ${error}`);
} */

// default user params
// used in app.get("/")
async function addUser() {
  const user = new User(
    {
      username: 'JohnDoe',
      firstname: 'John',
      lastname: 'Doe',
    }
  )

  const createdUser = await user.save();
}

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Hackathon Template listening at port: ${PORT}`);
});
