var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.right="0";
}
function hideMenu() {
    navLinks.style.right="-200px";
}

const moduleDisplay=document.getElementById("rasp");
const moduleDisplay2=document.getElementById("rasp2");

if(moduleDisplay!=null){
    fetch("login_popup", { 
        mode: 'no-cors',
    })  .then(response => {
        return response.json()
        })
        .then(data => {
            if(data.response.length>0)
            {
                document.getElementById("login").style.display="flex";
                const message1 = data.response;
                moduleDisplay.insertAdjacentHTML("beforeend", message1)
            }
        })
        .catch(err => console.log(err)); 
}
if(moduleDisplay2!=null){
    fetch("signup_popup", { 
        mode: 'no-cors',
    })  .then(response => {
        return response.json()
        })
        .then(data => {
            if(data.response.length>0)
                document.getElementById("signup").style.display="flex";
            const message2 = data.response;
            moduleDisplay2.insertAdjacentHTML("beforeend", message2)
        })
        .catch(err => console.log(err)); 
}
