const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { Kayn, REGIONS } = require('kayn');

const app = express();

const kayn = Kayn(process.env.RIOT_API_KEY)({
  region: REGIONS.LATIN_AMERICA_NORTH
});

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/game/:id', (req, res) => {
  kayn.Summoner.by
    .name(req.params.id)
    .then(summoner => {
      kayn.League.Entries.by
        .summonerID(summoner.id)
        .then(d => res.status(200).json(d))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
