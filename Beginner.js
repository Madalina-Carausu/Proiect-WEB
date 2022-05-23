

const moduleDisplay=document.getElementById("module1-1");
fetch("Beginner-response", { 
    mode: 'no-cors' // 'cors' by default
})  .then(response => {console.log(response);return response.json()})
    .then(data => {
        const title = `<p>`+data+"%"+`</p>`;
        console.log(title);
        moduleDisplay.insertAdjacentHTML("beforeend", title)
        console.log(data)
    })
    .catch(err => console.log(err))
