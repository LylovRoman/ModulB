let button = document.querySelector(".button");
let message = document.querySelector(".message");
button.addEventListener('click', function (){
    message.classList.add('hidden');
    fetch('http://yarko.ct25692.tw1.ru/api/shift', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
            opened_at: document.querySelector("input[name=opened_at]").value,
            closed_at: document.querySelector("input[name=closed_at]").value
        })
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
            message.classList.remove('hidden');
            message.innerHTML = "<p>" + result.error.message + "</p>";
            for([key, value] of Object.entries(result.error.errors)) {
                message.innerHTML += "<p>" + value[0] + "</p>";
            }
        });
    });
});
