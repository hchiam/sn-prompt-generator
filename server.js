const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = require("request");
const app = express();
const apiKey = process.env.APIKEY;

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/get-verse/:searchText", (request, response) => {
  let verseLocation = request.params.searchText;
  getVerseWords(verseLocation).then(function(res) {
    response.send(res);
  }, function(error) {
    response.send(error);
  });
});

// make this app publicly available for user requests
app.use(express.static(__dirname + '/public')); // so the public folder is used (e.g., so can serve app.css)

// make this app actually listen for requests
const listener = app.listen(process.env.PORT | 3000, () => { // | 3000 in case testing locally
  console.log('Your app is listening on port ' + listener.address().port);
});

// ----------------------------------------------------

function getVerseWords(searchText, offset = 0) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        const {data, meta} = JSON.parse(this.responseText);
        let copyright = '';
        let content = '';
        if (data && data.passages && data.passages[0]) {
          copyright = data.passages[0].copyright;
          content = data.passages[0].content;
        }
        
        resolve({
          content: content,
          copyright: copyright
        });
      }
    });
    
    xhr.open('GET', `https://api.scripture.api.bible/v1/bibles/06125adad2d5898a-01/search?query=${searchText}&offset=${offset}`);
    xhr.setRequestHeader('api-key', apiKey);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  }).catch(function(error) {
    console.log(error);
  });
}

// ----------------------------------------------------
