let button = document.querySelector(".button");
let button2 = document.querySelector(".button2");
button.addEventListener('click', function (){
    fetch('http://firstcafe.com/api-cafe/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: "Admin",
            password: ""
        })
    })
    .then((response) => response.json())
    .then((data) => localStorage.setItem('TOKEN', data.data.user_token));
});

button2.addEventListener('click', function (){
    fetch('http://firstcafe.com/api-cafe/users', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('TOKEN')
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
});
