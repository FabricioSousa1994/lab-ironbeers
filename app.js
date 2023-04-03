const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials')
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home')
});

app.get('/beers', async (req, res) => {
 const beers = await punkAPI.getBeers()
 console.log(beers);
  res.render('beers', {beers})
});

app.get('/random-beer', async (req, res) => {
  const randomBeers = await punkAPI.getRandom()
  console.log(randomBeers)
  res.render('random-beer', randomBeers[0])
})

/*também dava para fazer com o .then e ficaria assim:
app.get('/random-beer, (req, res) => {
  punkAPI
  .getRandom()
  .then(random-beer => {
    console.log(responseFromAPI);
    const randomBeer = random
    res.render('random-beer',random-beer[0])
  })
  .catch(erros => console.logpo(error));
})

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));*/
