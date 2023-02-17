fetch('http://yarko.ct25692.tw1.ru/api/me', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
    }
})
    .then((response) => {
        if (response.status > 300) {
            if (response.status == 401) {
                window.location.href = 'login.html';
            }
        }
        return response.json();
    })
    .then((data) => {
        if (data.data.role != 'Админ') {
            window.location.href = 'index.html';
        }
    })
let button = document.querySelector(".button");
let message = document.querySelector(".message");
button.addEventListener('click', function (){
    message.classList.add('hidden');
    fetch('http://yarko.ct25692.tw1.ru/api/shift', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
            opened_at: document.querySelector("input[name=opened_at]").value,
            closed_at: document.querySelector("input[name=closed_at]").value
        })
    })
    .then((response) => {
        if (response.status > 300) {
            if (response.status == 401) {
                window.location.href = 'login.html';
            }
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
    }).catch((error) => {
        error.then(result => {
            message.classList.remove('hidden');
            message.innerHTML = "<p>" + result.error.message + "</p>";
            for([key, value] of Object.entries(result.error.errors)) {
                message.innerHTML += "<p>" + value[0] + "</p>";
            }
        });
    });
});
