fetch('http://yarko.ct25692.tw1.ru/api/shift', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
    },
})
.then((response) => {
    if (response.status > 300) {
        throw response.json();
    }
    return response.json();
})
.then((data) => {
    console.log(data)
}).catch((error) => {
    error.then(result => {

    });
});
/*
button2.addEventListener('click', function (){
    fetch('http://firstcafe.com/api-cafe/users', {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('TOKEN')
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
});
*/
