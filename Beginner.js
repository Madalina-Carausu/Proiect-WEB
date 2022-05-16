
    console.log('about to fetch');
    const moduleDisplay=document.getElementById("module1-1");
    console.log('module display la inceput: ', moduleDisplay);
    fetch("Beginner-response", { 
        mode: 'no-cors' // 'cors' by default
    })  
    .then(response => {console.log('response',response);
                        return response.json();})
    .then(data => {
        const title = `<p>`+data+"%"+`</p>`;
        console.log('title', title);
        console.log('data', data);
        console.log('module display: ', moduleDisplay);
        moduleDisplay.insertAdjacentHTML("beforeend", title);
    })
    .catch(err => console.log('avem o eroare', err))
