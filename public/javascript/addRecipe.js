const newRecipe = document.getElementById('newRecipe');
newRecipe.addEventListener('click', function(e) {
  console.log('test');
  e.preventDefault();

  fetch('/newRecipe', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Recipe was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

