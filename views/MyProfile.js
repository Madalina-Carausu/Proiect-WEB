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
        {
            document.getElementById("my_profile").style.display="flex";
            document.getElementById("my_name").insertAdjacentHTML("beforeend", data.username)
        }
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

var person;

fetch("username-database-response", { 
    mode: 'no-cors'
})  .then(response => {return response.json()})
    .then(data => {
        person=data;  
    
    var numberForBeginner=0;
    fetch("courses/beginner", { 
        mode: 'no-cors' 
    })  .then(response => {return response.json()})
        .then(data => {

            var value=0;
            var title='';
            for(let i=0;i<person.tasks.length;i++){
                if(person.tasks[i].task.substring(0, 5)=="task1"){
                    value=value+Number(person.tasks[i].value);
                }
            }
            numberForBeginner=((value*100)/(4*data.length)).toFixed(2);
            if(person.plants!=undefined&&person.plants!=null&&person.plants.length>0)
                document.getElementById("my_plants").insertAdjacentHTML("beforeend", person.plants.length);
            else
            document.getElementById("my_plants").insertAdjacentHTML("beforeend", 0);
            if(numberForBeginner!=100){
                document.getElementById("my_level").insertAdjacentHTML("beforeend", "Beginner");
                document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForBeginner+"%");

                fetch("plants/beginner", { 
                    mode: 'no-cors' 
                })  .then(response => {return response.json()})
                    .then(data => {
                        let i=0;
                        var title1="";
                        var title2="";
                        let count=0;
            
                        if(i<data.length){
                            title1 = getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                        }
                        i++;
                        if(i<data.length){
                            title2 = getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                        }
                        title=title1+title2;
                        document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                        i++;
                        while(i<data.length){
                            title1="";
                            count=0;
                            while(i<data.length&&count<3){
                                title1 = title1 + getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                i++;
                                count++;
                            }
                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                            document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                            var arrayOfPlants = person.plants;
                            if(arrayOfPlants!=undefined&&arrayOfPlants!=null){
                                for (let i=0;i<arrayOfPlants.length;i++){
                                    if(document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=null&&document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=undefined)
                                    {
                                        document.getElementById(arrayOfPlants[i].image+"_checkbox1").checked=arrayOfPlants[i].task1;
                                        document.getElementById(arrayOfPlants[i].image+"_checkbox2").checked=arrayOfPlants[i].task2;
                                        document.getElementById(arrayOfPlants[i].image+"_checkbox3").checked=arrayOfPlants[i].task3;
                                    }
                                }

                            }
                        }
                    })
                    .catch(err => console.log(err));

                    fetch("plants/intermediate", { 
                        mode: 'no-cors' 
                    })  .then(response => {return response.json()})
                        .then(data => {
                            const text=`<p> Plants for Intermediate Level </p>`;
                            document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", text);
                            let i=0;
                            var title1="";
                            let count=0;
                
                            while(i<data.length){
                                title1="";
                                count=0;
                                while(i<data.length&&count<3){
                                    title1 = title1+getHtmlTextLocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                    i++;
                                    count++;
                                }
                                title=`<div class="row-myProfile">`+ title1+`</div>`;
                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", title);
                            }
                        })
                        .catch(err => console.log(err));
                        fetch("plants/advanced", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                const text=`<p> Plants for Advanced Level </p>`;
                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", text);
                                let i=0;
                                var title1="";
                                let count=0;
                    
                                while(i<data.length){
                                    title1="";
                                    count=0;
                                    while(i<data.length&&count<3){
                                        title1 = title1+getHtmlTextLocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                        i++;
                                        count++;
                                    }
                                    title=`<div class="row-myProfile">`+ title1+`</div>`;
                                    document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", title);
                                }
                            })
                            .catch(err => console.log(err));
            }
            else{
                var numberForIntermediate=0;
                fetch("courses/intermediate", { 
                    mode: 'no-cors' 
                })  .then(response => {return response.json()})
                    .then(data => {
                        var value=0;
                        for(let i=0;i<person.tasks.length;i++){
                            if(person.tasks[i].task.substring(0, 5)=="task2")
                                value=value+Number(person.tasks[i].value);
                        }
                        numberForIntermediate=((person.tasks.length*100)/(4*data.length)).toFixed(2);
                    })
                    .catch(err => console.log(err));
            
                    if(numberForIntermediate!=100){
                        document.getElementById("my_level").insertAdjacentHTML("beforeend", "Intermediate");
                        document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForIntermediate+"%");
                        fetch("plants/beginner", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                let i=0;
                                var title1="";
                                var title2="";
                                let count=0;
                    
                                if(i<data.length){
                                    title1=getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                }
                                i++;
                                if(i<data.length){
                                    title2 = getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                }
                                title=title1+title2;
                                document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                                i++;
                                while(i<data.length){
                                    title1="";
                                    count=0;
                                    while(i<data.length&&count<3){
                                        title1 = title1+getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                        i++;
                                        count++;
                                    }
                                    title=`<div class="row-myProfile">`+ title1+`</div>`;
                                    document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                }
                            })
                            .catch(err => console.log(err));
        
                            fetch("plants/intermediate", { 
                                mode: 'no-cors' 
                            })  .then(response => {return response.json()})
                                .then(data => {
                                    let i=0;
                                    var title1="";
                                    var title2="";
                                    let count=0;
                        
                                    while(i<data.length){
                                        title1="";
                                        count=0;
                                        while(i<data.length&&count<3){
                                            title1 = title1+getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                            i++;
                                            count++;
                                        }
                                        title=`<div class="row-myProfile">`+ title1+`</div>`;
                                        document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                        
                                        var arrayOfPlants = person.plants;
                                        if(arrayOfPlants!=undefined&&arrayOfPlants!=null){
                                            for (let i=0;i<arrayOfPlants.length;i++){
                                                if(document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=null&&document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=undefined)
                                                {
                                                    document.getElementById(arrayOfPlants[i].image+"_checkbox1").checked=arrayOfPlants[i].task1;
                                                    document.getElementById(arrayOfPlants[i].image+"_checkbox2").checked=arrayOfPlants[i].task2;
                                                    document.getElementById(arrayOfPlants[i].image+"_checkbox3").checked=arrayOfPlants[i].task3;
                                                }
                                            }

                                        }
                                    }
                                })
                                .catch(err => console.log(err));
                                fetch("plants/advanced", { 
                                    mode: 'no-cors' 
                                })  .then(response => {return response.json()})
                                    .then(data => {
                                        const text=`<p> Plants for Advanced Level </p>`;
                                        document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", text);
                                        let i=0;
                                        var title1="";
                                        let count=0;
                            
                                        while(i<data.length){
                                            title1="";
                                            count=0;
                                            while(i<data.length&&count<3){
                                                title1 = title1+getHtmlTextLocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                                i++;
                                                count++;
                                            }
                                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                                            document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", title);
                                        }
                                    })
                                    .catch(err => console.log(err));
                    }
                    else{
                        var numberForAdvanced=0;
                        fetch("/courses/advanced", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                var value=0;
                                for(let i=0;i<person.tasks.length;i++){
                                    if(person.tasks[i].task.substring(0, 5)=="task3")
                                        value=value+Number(person.tasks[i].value);
                                }
                                numberForAdvanced=((value*100)/(4*data.length)).toFixed(2);
                            })
                            .catch(err => console.log(err));
                            document.getElementById("my_level").insertAdjacentHTML("beforeend", "Advanced");
                            document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForAdvanced+"%");

                            fetch("plants/beginner", { 
                                mode: 'no-cors' 
                            })  .then(response => {return response.json()})
                                .then(data => {
                                    let i=0;
                                    var title1="";
                                    var title2="";
                                    let count=0;
                        
                                    if(i<data.length){
                                        title1 = getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                    }
                                    i++;
                                    if(i<data.length){
                                        title2 = getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                    }
                                    title=title1+title2;
                                    document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                                    i++;
                                    while(i<data.length){
                                        title1="";
                                        count=0;
                                        while(i<data.length&&count<3){
                                            title1 = title1+getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                            i++;
                                            count++;
                                        }
                                        title=`<div class="row-myProfile">`+ title1+`</div>`;
                                        document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                    }
                                })
                                .catch(err => console.log(err));
            
                                fetch("plants/intermediate", { 
                                    mode: 'no-cors' 
                                })  .then(response => {return response.json()})
                                    .then(data => {
                                        let i=0;
                                        var title1="";
                                        let count=0;
                            
                                        while(i<data.length){
                                            title1="";
                                            count=0;
                                            while(i<data.length&&count<3){
                                                title1 = title1+getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                                i++;
                                                count++;
                                            }
                                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                                            document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                        }
                                    })
                                    .catch(err => console.log(err));
                                    fetch("plants/advanced", { 
                                        mode: 'no-cors' 
                                    })  .then(response => {return response.json()})
                                        .then(data => {
                                            let i=0;
                                            var title1="";
                                            let count=0;
                                
                                            while(i<data.length){
                                                title1="";
                                                count=0;
                                                while(i<data.length&&count<3){
                                                    title1 = title1+getHtmlTextUnlocked(data[i].image,data[i].name,data[i].task1,data[i].task2,data[i].task3);
                                                    i++;
                                                    count++;
                                                }
                                                title=`<div class="row-myProfile">`+ title1+`</div>`;
                                                document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", "You have all plants!");  
                                                var arrayOfPlants = person.plants;
                                                if(arrayOfPlants!=undefined&&arrayOfPlants!=null){
                                                    for (let i=0;i<arrayOfPlants.length;i++){
                                                        if(document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=null&&document.getElementById(arrayOfPlants[i].image+"_checkbox1")!=undefined)
                                                        {
                                                            document.getElementById(arrayOfPlants[i].image+"_checkbox1").checked=arrayOfPlants[i].task1;
                                                            document.getElementById(arrayOfPlants[i].image+"_checkbox2").checked=arrayOfPlants[i].task2;
                                                            document.getElementById(arrayOfPlants[i].image+"_checkbox3").checked=arrayOfPlants[i].task3;
                                                        }
                                                    }

                                                }
                                            }
                                        })
                                        .catch(err => console.log(err));
                    }
            }

        })
        .catch(err => console.log(err));
})
.catch(err => console.log(err));


function getHtmlTextUnlocked(image, name, task1, task2, task3){
    return `<div class="col-myProfile-unlocked" >
    <div class="titleAndImage"> 
        <img src="images/`+ image+ `.png" alt="Eroare"> 
        <div class="col-myProfile-unlocked-title">`+name +`</div> 
    </div> 
    <div class="text"> 
        <div class="status">Status:</div> 
        <form action="/plant_`+ image+`" method="post"> 
            <p> 
                <label class="container-checkbox"> 
                    <input name="task" type="checkbox" value="1" id="`+image+`_checkbox1">
                    <span class="checkmark"></span>`+ task1 +`
                </label>
                <label class="container-checkbox"> 
                    <input name="task" type="checkbox" value="2" id="`+image+`_checkbox2">
                    <span class="checkmark"></span>`+ task2 +`
                </label>
                <label class="container-checkbox"> 
                    <input name="task" type="checkbox" value="3" id="`+image+`_checkbox3">
                    <span class="checkmark"></span>`+ task3 +`
                </label>  
                <input type="submit" class="submitClass">
            </p>
        </form> 
    </div>
</div> `;
}
function getHtmlTextLocked(image, name, task1, task2, task3){
 return `<div class="col-myProfile-locked" >
            <div class="titleAndImage"> 
                <img src="images/`+ image+ `.png" alt="Eroare"> 
                <div class="col-myProfile-unlocked-title">`+name +`</div> 
            </div> 
            <div class="text"> 
                <div class="status">Status:</div> 
                <form action="/plant_`+ image+`" method="post"> 
                    <p> 
                        <label class="container-checkbox"> 
                            <input name="task" type="checkbox" disabled value="1" id="`+image+`_checkbox1">
                            <span class="checkmark"></span>`+ task1 +`
                        </label>
                        <label class="container-checkbox"> 
                            <input name="task" type="checkbox" disabled value="2" id="`+image+`_checkbox2">
                            <span class="checkmark"></span>`+ task2 +`
                        </label>
                        <label class="container-checkbox"> 
                            <input name="task" type="checkbox" disabled value="3" id="`+image+`_checkbox3">
                            <span class="checkmark"></span>`+ task3 +`
                        </label>  
                        <input type="submit" class="submitClass" disabled>
                    </p>
                </form> 
            </div>
        </div> `;
}

