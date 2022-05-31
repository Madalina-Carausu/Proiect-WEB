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

const selectDiv = document.getElementById("chosen_question");
fetch("get_questions", { 
    mode: 'no-cors'
})  .then(response => {return response.json()})
    .then(data => {
        var option;
        var value;
        var i=0;
        while(i<data.length){
            option = "";  
            value = "";      
            const question = data[i].question;
            const user = data[i].username;                    
            i++;
            value = question + ` --- FROM ` + user;
            option = `<option value="` + value + `">` + value + `</option>`;
            selectDiv.insertAdjacentHTML("beforeend", option);
        }
    })
    .catch(err => console.log(err));    

/*
$("#myFile_plant").change(function() {
    filename = this.name;
    console.log(filename);
    });*/
    