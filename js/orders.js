let wrapper = document.querySelector(".wrapper");
let table = document.createElement('table');
table.classList.add('border-collapse');
table.classList.add('border-border');
table.classList.add('border-slate-400');
table.classList.add('table');
table.classList.add('mt-4');
let row = document.createElement('tr');
let column = document.createElement('td');
let th = document.createElement('th');
let button = document.createElement('button');
let ul = document.createElement('ul');
let li = document.createElement('li');
fetch('http://yarko.ct25692.tw1.ru/api/order', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
    },
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
    th.innerHTML = "Номер заказа";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Имя клиента";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Имя мастера";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Статус";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Цена";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = "Продукты";
    th.classList.add('border-slate-300');
    th.classList.add('border');
    th.classList.add('border-dark');
    th.classList.add('text-center');
    th.classList.add('bg-[#ffffff]');
    row.appendChild(th);
    table.appendChild(row);

    data.forEach(el => {
        row = document.createElement('tr');
        column = document.createElement('td');
        column.innerHTML = el.id;
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        row.appendChild(column);
        column = document.createElement('td');
        column.innerHTML = el.client.name;
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        row.appendChild(column);
        column = document.createElement('td');
        column.innerHTML = el.master ? el.master.name : "не назначен";
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        row.appendChild(column);
        column = document.createElement('td');
        column.innerHTML = el.status;
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        row.appendChild(column);
        column = document.createElement('td');
        column.innerHTML = el.total_price;
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        row.appendChild(column);
        column = document.createElement('td');
        button = document.createElement('button');
        button.addEventListener('click', function () {
            fetch('http://yarko.ct25692.tw1.ru/api/order/' + el.id + '/product', {
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
                    td = this.parentNode;
                    td.innerHTML = null;
                    ul = document.createElement('ul');
                    data.forEach(el => {
                        li = document.createElement('li');
                        li.innerHTML = el.name + ' - ' + el.price + ' руб.';
                        ul.appendChild(li)
                    })
                    td.appendChild(ul);
                })
                .catch((error) => {
                error.then(result => {

                });
            });
        })
        button.classList.add('bg-success');
        button.innerHTML = 'Показать';
        column.classList.add('border-slate-300');
        column.classList.add('border');
        column.classList.add('border-dark');
        column.classList.add('text-center');
        column.classList.add('bg-[#ffffff]');
        column.appendChild(button);
        row.appendChild(column);
        table.appendChild(row);
    })
    wrapper.appendChild(table);
}).catch((error) => {
    error.then(result => {

    });
});
