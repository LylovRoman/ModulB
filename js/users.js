let wrapper = document.querySelector(".wrapper");
let table = document.createElement('table');
let select = document.createElement('select');
let option = document.createElement('option');
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
fetch('http://yarko.ct25692.tw1.ru/api/shift', {
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
        th.innerHTML = "Номер смены";
        th.classList.add('border-slate-300');
        th.classList.add('border');
        th.classList.add('border-dark');
        th.classList.add('text-center');
        th.classList.add('bg-[#ffffff]');
        row.appendChild(th);
        th = document.createElement('th');
        th.innerHTML = "Открытие";
        th.classList.add('border-slate-300');
        th.classList.add('border');
        th.classList.add('border-dark');
        th.classList.add('text-center');
        th.classList.add('bg-[#ffffff]');
        row.appendChild(th);
        th = document.createElement('th');
        th.innerHTML = "Закрытие";
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
        th.innerHTML = "Подробнее";
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
            column.innerHTML = el.opened_at;
            column.classList.add('border-slate-300');
            column.classList.add('border');
            column.classList.add('border-dark');
            column.classList.add('text-center');
            column.classList.add('bg-[#ffffff]');
            row.appendChild(column);
            column = document.createElement('td');
            column.innerHTML = el.closed_at;
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
            a = document.createElement('a');
            a.innerHTML = 'Подробнее';
            a.href = 'shiftSingle.html?id=' + el.id;
            column.classList.add('border-slate-300');
            column.classList.add('border');
            column.classList.add('border-dark');
            column.classList.add('text-center');
            column.classList.add('bg-[#ffffff]');
            column.appendChild(a);
            row.appendChild(column);
            table.appendChild(row);
        })
        wrapper.appendChild(table);
    }).catch((error) => {
    error.then(result => {

    });
});
