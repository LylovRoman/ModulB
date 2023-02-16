let button = document.querySelector(".button");
let message = document.querySelector(".message");
button.addEventListener('click', function (){
    message.classList.add('hidden');
    fetch('http://yarko.ct25692.tw1.ru/api/user/' + document.querySelector("input[name=role_id]").value, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
            login: document.querySelector("input[name=login]").value,
            password: document.querySelector("input[name=password]").value,
            name: document.querySelector("input[name=name]").value
        })
    })
    .then((response) => {
        if (response.status > 300) {
            if (response.status == 401) {
                window.location.href = 'index.html';
            }
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        error.then(result => {
            console.log(result)
            message.classList.remove('hidden');
            message.innerHTML = "<p>" + result.error.message + "</p>";
            for([key, value] of Object.entries(result.error.errors)) {
                message.innerHTML += "<p>" + value[0] + "</p>";
            }
        });
    });
});
