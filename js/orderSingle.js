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
fetch('http://yarko.ct25692.tw1.ru/api/order/' + window.location.search.replace( '?id=', ''), {
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
        p = document.createElement('p');
        p.innerHTML = 'Имя клиента: ' + data.client.name;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Имя мастера: ' + (data.master ? data.master : 'не указано');
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Статус: ' + data.status;
        wrapper.appendChild(p);
        p = document.createElement('p');
        p.innerHTML = 'Стоимость: ' + data.total_price;
        wrapper.appendChild(p);

        ul = document.createElement('select');
        button = document.createElement('button');
        button.innerHTML = "Установить статус";
        button.addEventListener('click', function (){
            fetch('http://yarko.ct25692.tw1.ru/api/order/' + window.location.search.replace( '?id=', ''), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
                },
                body: JSON.stringify({
                    status_id: ul.value
                })
            })
                .then((response) => {
                    if (response.status > 300) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then((data) => {
                    window.location.href = 'orderSingle.html' + window.location.search;
                }).catch((error) => {
                error.then(result => {

                });
            });
        });
        let options = [];
        //пропиши условия для этих вариантов
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
            .then((data1) => {
                if (data1.data.role == 'Мастер') {
                    li = document.createElement('option');
                    li.innerHTML = 'выполнен';
                    li.value = 2;
                    ul.appendChild(li);
                    if (data.status != 'выполнен') {
                        li = document.createElement('option');
                        li.innerHTML = 'отменен';
                        li.value = 4;
                        ul.appendChild(li);
                    }
                }
                if (data1.data.role == 'Админ') {
                    li = document.createElement('option');
                    li.innerHTML = 'оплачен';
                    li.value = 3;
                    ul.appendChild(li);
                    li = document.createElement('option');
                    li.innerHTML = 'отменен';
                    li.value = 4;
                    ul.appendChild(li);
                }
                wrapper.appendChild(ul);
                wrapper.appendChild(button);

                button = document.createElement('button');
                button.innerHTML = "Удалить заказ";
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
            })
    });
