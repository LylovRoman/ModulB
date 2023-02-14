let wrapper = document.querySelector(".wrapper");
let div = document.createElement('div');
let select = document.createElement('select');
let option = document.createElement('option');
let button = document.createElement('button');
let p = document.createElement('p');
let ul = document.createElement('ul');
let li = document.createElement('li');
fetch('http://yarko.ct25692.tw1.ru/api/shift/' + window.location.search.replace( '?id=', ''), {
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
                data.forEach(el => {
                    li = document.createElement('li');
                    li.innerHTML = el.name;
                    wrapper.appendChild(li);
                })
                wrapper.appendChild(ul);
            }).catch((error) => {
            error.then(result => {

            });
        });

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
                            console.log(data)
                        }).catch((error) => {
                        error.then(result => {

                        });
                    });
                });
                data.forEach(el => {
                    li = document.createElement('option');
                    li.innerHTML = el.name;
                    li.value = el.id;
                    ul.appendChild(li);
                })
                wrapper.appendChild(ul);
                wrapper.appendChild(button);
            }).catch((error) => {
            error.then(result => {

            });
        });
    }).catch((error) => {
    error.then(result => {

    });
});
