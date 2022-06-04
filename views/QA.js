var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right="0";
}

function hideMenu() {
    navLinks.style.right="-200px";
}

fetch("get_login", { 
    mode: 'no-cors'
})  .then(response => {return response.json()})
    .then(data => {
        if(data!=null&&data!=undefined&&data.response!=null&&data.response!=undefined&&data.response==1)
            document.getElementById("my_profile").style.display="flex";
        else
            document.getElementById("my_profile").style.display="none";
    })
    .catch(err => console.log(err));

fetch("get_admin", { 
    mode: 'no-cors'
})  .then(response => {return response.json()})
.then(data => {
    if(data!=null&&data!=undefined&&data.response!=null&&data.response!=undefined&&data.response==1)
        document.getElementById("admin").style.display="flex";
    else
        document.getElementById("admin").style.display="none";
})
.catch(err => console.log(err));

function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

const divQuestions = document.getElementById("q_list");
fetch("questions/answered", { 
    mode: 'no-cors' // 'cors' by default
})  .then(response => {return response.json()})
    .then(data => {
        var value;
        var i=0;
        while(i<data.length){
            value = "";      
            const question = data[i].question;
            const user = data[i].username;    
            const answer = data[i].answer;                
            i++;
            value = `<div class="q_row_colorat">
            <div class="q_row" >
                <div class="user" >
                    <img  src="images/generalUser.png" alt="user profile image">
                    <div class="q_text">
                        <h4>` + user +`</h4>
                    </div>
                </div>
                <div class="q_text">
                    <div class="question"><p>Q: ` + question + ` </p></div>
                    <p>A: ` + answer + `<a href="./modules/BeginnerGardenBasics.html#organicGardening">[read more]</a></p>
                </div>
            </div>`;
            divQuestions.insertAdjacentHTML("beforeend", value);
        }
    })
    .catch(err => console.log(err));