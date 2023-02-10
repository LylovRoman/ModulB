fetch('http://yarko.ct25692.tw1.ru/api/order/{order_id}/product', {
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
    console.log(data)
}).catch((error) => {
    error.then(result => {

    });
});
