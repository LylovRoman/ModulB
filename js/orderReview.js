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
    fetch('http://yarko.ct25692.tw1.ru/api/order/' + window.location.search.replace( '?id=', '') + '/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
            content: document.querySelector("textarea[name=content]").value
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
        console.log(data);
    })
});
