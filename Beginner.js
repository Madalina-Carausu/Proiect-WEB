

const moduleDisplay=document.getElementById("module1-1");
fetch("http://localhost:1234/Beginner.html")
    .then(data => {
        const title = `<p>`+"59%"+`</p>`;
        console.log(title);
        moduleDisplay.insertAdjacentHTML("beforeend", title)
    })
    .catch(err => console.log(err))
