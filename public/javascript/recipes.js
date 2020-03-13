const delete_recipe = (event) => {
    const sender = new window.XMLHttpRequest()
    const id = {
        id: 'event.target.id'
    };

    sender.open('POST', 'http://localhost:3000/myrecipes', true)
    sender.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    sender.send(JSON.stringify(id));
    console.log(event.target.id)
}

const delButton = document.getElementsByClassName('delete');
for (i = 0; i < delButton.length; i++) {
    delButton[i].addEventListener('click', delete_recipe);
}

