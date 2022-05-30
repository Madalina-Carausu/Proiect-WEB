
var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.right="0";
}
function hideMenu() {
    navLinks.style.right="-200px";
}
const divIntermediate = document.getElementById("divForIntermediate");

var person;

fetch("username-database-response", { 
    mode: 'no-cors' 
})  .then(response => {return response.json()})
    .then(data => {
        person=data;
        fetch("Intermediate-response", { 
            mode: 'no-cors' // 'cors' by default
        })  .then(response => {return response.json()})
            .then(data => {
                var title1="", title2="", title3="";
                var i=0;
                while(i<data.length){
                    let count=0;
                    title1="";
                    title2="";
                    title3="";
                    while(count<3&&i<data.length){
                        const number=data[i].number;
                        const maxPoints=data[i].maxPoints;
                        if(count==0){
                            title1 = `<a href="./modules/Intermediate`+number+`.html"`+ ` class="lesson-col-begintadv module2-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m2-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        else
                        if(count==1){
                            title2 = `<a href="./modules/Intermediate`+number+`.html"`+ ` class="lesson-col-begintadv module2-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m2-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        else{
                            title3 = `<a href="./modules/Intermediate`+number+`.html"`+ ` class="lesson-col-begintadv module2-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m2-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        count++;
                        i++;
                    }
                    const title=`<div class="row">`+title1+title2+title3+`</div>`
                    divIntermediate.insertAdjacentHTML("beforeend", title)
                }
                for(let i=0;i<data.length;i++){
                    const task="task2_"+data[i].number;
                    if(person!="Eroare"&&person!=null&&person!=undefined){
                        var element=person.tasks.filter(element => element.task==task);
                        if(element!=null&&element!=undefined&&element.length>0)
                            document.getElementById("m2-"+data[i].number).insertAdjacentHTML("beforeend", (Number(element[0].value)*100/data[i].maxPoints)+"%");
                        else
                            document.getElementById("m2-"+data[i].number).insertAdjacentHTML("beforeend", "0%");
                    }
                    else 
                    {
                        document.getElementById("m2-"+data[i].number).insertAdjacentHTML("beforeend", "0%");
                    }
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

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