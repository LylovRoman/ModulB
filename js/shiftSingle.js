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
fetch('http://yarko.ct25692.tw1.ru/api/shift/' + window.location.search.replace( '?id=', ''), {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
    },
})
    .then((response) => {
        if (response.status > 300) {
            if (response.status == 401) {
                window.location.href = 'login.html';
            }
            throw response.json();
        }
        return response.json();
    })
    .then((data) => {
        p = document.createElement('p');
        p.innerHTML = 'Открытие: ' + data.opened_at;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Закрытие: ' + data.closed_at;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Статус: ' + data.status;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Работники:';
        wrapper.appendChild(p);
        fetch('http://yarko.ct25692.tw1.ru/api/shift/' + window.location.search.replace( '?id=', '') + '/worker', {
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
                ul = document.createElement('ul');
                let names = [];
                data.forEach(el => {
                    li = document.createElement('li');
                    a = document.createElement('a');
                    a.innerHTML = ' x ';
                    a.addEventListener('click', function (){
                        fetch('http://yarko.ct25692.tw1.ru/api/shift/' + window.location.search.replace( '?id=', '') + '/worker/' + el.id, {
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
                                window.location.href = 'shiftSingle.html' + window.location.search;
                            })
                    })
                    li.innerHTML = el.name;
                    names.push(el.name);
                    li.appendChild(a);
                    wrapper.appendChild(li);
                })
                wrapper.appendChild(ul);
                p = document.createElement('span');
                p.innerHTML = 'Назначить на смену:';
                wrapper.appendChild(p);
                fetch('http://yarko.ct25692.tw1.ru/api/worker', {
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
                        ul = document.createElement('select');
                        button = document.createElement('button');
                        button.innerHTML = "Добавить";
                        button.addEventListener('click', function (){
                            fetch('http://yarko.ct25692.tw1.ru/api/shift/' + window.location.search.replace( '?id=', '') + '/worker', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
                                },
                                body: JSON.stringify({
                                    user_id: ul.value
                                })
                            })
                                .then((response) => {
                                    if (response.status > 300) {
                                        throw response.json();
                                    }
                                    return response.json();
                                })
                                .then((data) => {
                                    window.location.href = 'shiftSingle.html' + window.location.search;
                                }).catch((error) => {
                                error.then(result => {

                                });
                            });
                        });
                        data.forEach(el => {
                            if (!names.includes(el.name)){
                                li = document.createElement('option');
                                li.innerHTML = el.name;
                                li.value = el.id;
                                ul.appendChild(li);
                            }
                        })
                        wrapper.appendChild(ul);
                        wrapper.appendChild(button);
                    })
            })
});
