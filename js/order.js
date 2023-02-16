let button = document.querySelector(".button");
let message = document.querySelector(".message");
let checkboxes = document.querySelector(".checkboxes");
fetch('http://yarko.ct25692.tw1.ru/api/product', {
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
        data.forEach((element, key) => {
            let div = document.createElement('div');
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = element.id;
            let name = document.createElement('p');
            name.classList.add('margin-0');
            name.classList.add('margin-left');
            name.innerHTML = element.name;
            div.appendChild(checkbox);
            div.appendChild(name);
            div.classList.add('flex');
            checkboxes.appendChild(div);
        })
    });

button.addEventListener('click', function (){
    let ids = [];
    document.querySelectorAll("input[type=checkbox]").forEach(el => {
        ids.push(el.name);
    })
    message.classList.add('hidden');
    fetch('http://yarko.ct25692.tw1.ru/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        },
        body: JSON.stringify({
            products_ids: ids,
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
