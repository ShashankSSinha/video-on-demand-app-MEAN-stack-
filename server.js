const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
 
// mongoose.connect('mongodb://localhost/videos');
mongoose.connect('mongodb://shashank:sinha@ds153709.mlab.com:53709/vodmeandb');

// Creating a schema
const videoSchema = new mongoose.Schema({
  sessionToken: String,
  title: String,
  thumbnailUrl: String,
  videoPlayUrl: String
});
// Creating a model based on the schema
const video = mongoose.model('video', videoSchema);
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('port', process.env.PORT || 3000);
 
app.get('/viewed', (req, res) => {
  const sessionToken = req.query.sessionToken;

  video.find(
    {
      sessionToken
    }, (error, result) => {
      if(error) {
        console.log(error);
        return;
      }     
      res.send(result);   
  });
});

app.post('/save', (req, res) => {
  const v = req.body.video;
  const sessionToken = req.body.sessionToken;

  video.update(
    {
      sessionToken,
      title: v.title
    },
    {
      sessionToken: sessionToken,
      title: v.title,
      thumbnailUrl: v.images[0].url,
      videoPlayUrl: v.contents[0].url
    },{
      upsert: true
    }, (error, result) => {
  	  if(error) {
  		  console.log(error);
        return;
      }		  
      console.log(result);  	  
  });
});

app.delete('/clear', (req, res) => {
  const sessionToken = req.query.sessionToken;

  video.remove(
    {
      sessionToken
    }, (error, result) => {
      if(error) {
        console.log(error);
        return;
      }     
      console.log(result); 
      res.send(result);
  });
});

app.get('/home', (req, res) => {
  res.sendFile('./public/index.html', {root: __dirname});
});

app.use(express.static(path.join(__dirname, './public')));

app.listen(app.get('port'), () => {
  console.log(`Express video server listening on port ${app.get('port')}`);
});
