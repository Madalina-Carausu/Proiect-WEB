var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.right="0";
}
function hideMenu() {
    navLinks.style.right="-200px";
}

const divBeginner = document.getElementById("divForBeginner");

var person;

fetch("username-database-response", { 
    mode: 'no-cors' 
})  .then(response => {return response.json()})
    .then(data => {
        person=data;
        fetch("Beginner-response", { 
            mode: 'no-cors' 
        })  .then(response => {return response.json()})
            .then(data => {
                var title1="", title2="", title3="";
                var i=0;
                while(i<data.length && i<9){
                    let count=0;
                    title1="";
                    title2="";
                    title3="";
                    while(count<3&&i<data.length && i<9){
                        const number=data[i].number;
                        const maxPoints=data[i].maxPoints;
                        if(count==0){
                            title1 = `<a href="./modules/Beginner`+number+`.html"`+ ` class="lesson-col-begintadv module1-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m1-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        else
                        if(count==1){
                            title2 = `<a href="./modules/Beginner`+number+`.html"`+ ` class="lesson-col-begintadv module1-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m1-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        else{
                            title3 = `<a href="./modules/Beginner`+number+`.html"`+ ` class="lesson-col-begintadv module1-`+number+`">`+
                            `<h3>`+data[i].display+ `</h3>` + `<p id="m1-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                        }
                        count++;
                        i++;
                    }
                    const title=`<div class="row">`+title1+title2+title3+`</div>`
                    divBeginner.insertAdjacentHTML("beforeend", title)
                }
                while(i<data.length && i>=9){
                    let count=0;
                    title1="";
                    title2="";
                    title3="";
                    while(count<3&&i<data.length && i>=9){
                        const number=data[i].number;
                        const maxPoints=data[i].maxPoints;
                        var beginnerX = "Beginner" + number;
                        if(count==0){
                            title1 = `<form action = "/`+beginnerX+`" method="POST" class = "lesson-col-begintadv module1-3">
                            <label for="Beginner`+number+`">
                                <h3>`+data[i].display+`</h3>
                                <p id="m1-`+number+`" value=`+maxPoints+`></p>
                            </label>
                            <input type="submit" id="Beginner`+number+`" style="display:none;"></input>
                            </form>`;
                        }
                        else
                        if(count==1){
                            title2 = `<form action = "/`+beginnerX+`" method="POST" class = "lesson-col-begintadv module1-3">
                            <label for="Beginner`+number+`">
                                <h3>`+data[i].display+`</h3>
                                <p id="m1-`+number+`" value=`+maxPoints+`></p>
                            </label>
                            <input type="submit" id="Beginner`+number+`" style="display:none;"></input>
                            </form>`;  
                        }
                        else{
                            title3 = `<form action = "/`+beginnerX+`" method="POST" class = "lesson-col-begintadv module1-3">
                            <label for="Beginner`+number+`">
                                <h3>`+data[i].display+`</h3>
                                <p id="m1-`+number+`" value=`+maxPoints+`></p>
                            </label>
                            <input type="submit" id="Beginner`+number+`" style="display:none;"></input>
                            </form>`;
                        }
                        count++;
                        i++; 
                    }
                    const titlee=`<div class="row">`+title1+title2+title3+`</div>`
                    divBeginner.insertAdjacentHTML("beforeend", titlee)
                }
                for(let i=0;i<data.length;i++){
                    const task="task1_"+data[i].number;
                    if(person!="Eroare"&&person!=null&&person!=undefined){
                        var element=person.tasks.filter(element => element.task==task);
                        if(element!=null&&element!=undefined&&element.length>0)
                            document.getElementById("m1-"+data[i].number).insertAdjacentHTML("beforeend", (Number(element[0].value)*100/data[i].maxPoints)+"%");
                        else
                            document.getElementById("m1-"+data[i].number).insertAdjacentHTML("beforeend", "0%");
                    }
                    else 
                    {
                        document.getElementById("m1-"+data[i].number).insertAdjacentHTML("beforeend", "0%");
                    }
                }
                const length=data.length;
                setInterval(function(){
                    $.ajax({
                        type: 'GET',
                        dataType: "json",
                        url: '/ranking',
                        success: function (data) {
                            if(data!=null&&data!=undefined){
                                var name1="", name2="", name3="";
                                var points1=0, points2=0, points3=0;
                                for(let i=0;i<data.length;i++){
                                    var value=0;
                                    for(let j=0;j<data[i].tasks.length;j++){
                                        if(data[i].tasks[j].task.substring(0, 5)=="task1")
                                            value=value+Number(data[i].tasks[j].value);
                                    }
                                    if(value!=0){
                                        value=((value*100)/(4*length)).toFixed(2);
                                        if(Number(value)>=Number(points1)){
                                            points3=points2;
                                            name3=name2;
                                            points2=points1;
                                            name2=name1;
                                            points1=value;
                                            name1=data[i].name;
                                        }
                                        else
                                        if(Number(value)>=Number(points2)){
                                            points3=points2;
                                            name3=name2;
                                            points2=value;
                                            name2=data[i].name;
                                        }
                                        else
                                        if(Number(value)>=Number(points3)){
                                            points3=value;
                                            name3=data[i].name;
                                        }
                                    }
                                    
                                }
                            }
                            document.getElementById("1rank1").innerHTML=name1+`<br>`+points1;
                            document.getElementById("1rank2").innerHTML=name2+`<br>`+points2;
                            document.getElementById("1rank3").innerHTML=name3+`<br>`+points3;
                        }
                    });
                 }, 2000)
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

