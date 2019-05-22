const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request-promise');

app.use(cors({
  origin: 'http://localhost:5000'
}))

// Get location of user
app.get('/', (req, res) => {
  request({ method: 'GET', uri: 'https://freegeoip.app/json/' })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    })
});

// Get location of custom ip
app.get('/:ip*', (req, res) => {
  if(req.params.ip + req.params[0] !== 'favicon.ico') {
    request({ method: 'GET', uri: `https://freegeoip.app/json/${req.params.ip + req.params[0]}` })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        console.log(err);
      })
  }
})

const port = 8000;

app.listen(port, () => {
  console.log('Listening...');
  console.log(`port ${port}`);
})