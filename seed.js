require('./config/database');

const Movie = require('./models/movie');
const Performer = require('./models/performer');

// For better organization, the see data is being stored in a separate data.js module
const data = require('./data');


// Save the promises (or call right in the array if feeling frisky)
const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({})


Promise.all([p1, p2])
.then(function(results) {
  console.log(results);
  return Promise.all([Performer.create(data.performers),Movie.create(data.movies)]);
})
.then(function(results) {
    console.log(results);
}).then(function(movies) {
    return Promise.all([
      Performer.findOne({name: 'Mark Hamill'}),
      Movie.findOne({title: 'Star Wars - A New Hope'})
    ]);
  })
  .then(function(results) {  // one day we'll destructure this!
    const mark = results[0];
    const starWars = results[1];
    starWars.cast.push(mark);
    return starWars.save();
  })
// Yes we can!
.then(process.exit);