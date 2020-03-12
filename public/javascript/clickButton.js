const flagButton = document.getElementById('flagbutton');
flagButton.addEventListener('click', function(e) {
  console.log('Recipe was flagged');

  fetch('/flagged', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Flag was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

const likeButton = document.getElementById('likebutton');
likeButton.addEventListener('click', function(e) {
  console.log('Recipe was liked');
  e.preventDefault();

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Like was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
setInterval(function() {
  fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      document.getElementById('counter').innerHTML = `${data.length} Likes`;
    })
    .catch(function(error) {
      console.log(error);
    });
}, 1000);