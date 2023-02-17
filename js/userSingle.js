let wrapper = document.querySelector(".wrapper");
let div = document.createElement('div');
let select = document.createElement('select');
let option = document.createElement('option');
let button = document.createElement('button');
let p = document.createElement('p');
let a = document.createElement('a');
let ul = document.createElement('ul');
let li = document.createElement('li');
if (!window.location.search) {
    window.location.href = 'index.html';
}
fetch('http://yarko.ct25692.tw1.ru/api/user/' + window.location.search.replace( '?id=', ''), {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
    },
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
        p = document.createElement('p');
        p.innerHTML = 'Имя: ' + data.name;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Роль: ' + data.role;
        wrapper.appendChild(p);

        button = document.createElement('button');
        button.innerHTML = "Уволить";
        button.addEventListener('click', function (){
            fetch('http://yarko.ct25692.tw1.ru/api/order/' + window.location.search.replace( '?id=', ''), {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
                }
            })
                .then((response) => {
                    if (response.status > 300) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then((data) => {
                    window.location.href = 'orders.html';
                })
        });
        wrapper.appendChild(button);
    });