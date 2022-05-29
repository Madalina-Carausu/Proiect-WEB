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
    mode: 'no-cors' // 'cors' by default
})  .then(response => {return response.json()})
    .then(data => {
        person=data;  
    var numberForBeginner=0;
    fetch("Beginner-response", { 
        mode: 'no-cors' 
    })  .then(response => {return response.json()})
        .then(data => {
            var value=0;
            var title='';
            for(let i=0;i<data.length;i++){
                const task="task1_"+data[i].number;
                if(person[task]!=undefined&&person[task]!=null)
                    value=value+person[task];
            }
            numberForBeginner=((value*100)/(4*data.length)).toFixed(2);
            if(numberForBeginner!=100){
                document.getElementById("my_level").insertAdjacentHTML("beforeend", "Beginner");
                document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForBeginner+"%");


                fetch("Plants-Beginner", { 
                    mode: 'no-cors' 
                })  .then(response => {return response.json()})
                    .then(data => {
                        let i=0;
                        var title1="";
                        var title2="";
                        let count=0;
            
                        if(i<data.length){
                            title1 = `<div class="col-myProfile-unlocked" >
                                        <div class="titleAndImage"> 
                                            <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                            <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                        </div> 
                                        <div class="text"> 
                                            <div class="status">Status:</div> 
                                            <form action="/plant_`+ data[i].name+`" method="post"> 
                                                <p> 
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox1">
                                                        <span class="checkmark"></span>`+ data[i].task1 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                        <span class="checkmark"></span>`+ data[i].task2 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox3">
                                                        <span class="checkmark"></span>`+ data[i].task3 +`
                                                    </label> 
                                                    <input type="submit" class="submitClass"> 
                                                </p>
                                            </form> 
                                        </div>
                                    </div> `;
                        }
                        i++;
                        if(i<data.length){
                            title2 = `<div class="col-myProfile-unlocked" >
                                        <div class="titleAndImage"> 
                                            <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                            <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                        </div> 
                                        <div class="text"> 
                                            <div class="status">Status:</div> 
                                            <form action="/plant_`+ data[i].name+`" method="post"> 
                                                <p> 
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox1">
                                                        <span class="checkmark"></span>`+ data[i].task1 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                        <span class="checkmark"></span>`+ data[i].task2 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox3">
                                                        <span class="checkmark"></span>`+ data[i].task3 +`
                                                    </label>  
                                                    <input type="submit" class="submitClass">
                                                </p>
                                            </form> 
                                        </div>
                                    </div> `;
                        }
                        title=title1+title2;
                        document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                        i++;
                        while(i<data.length){
                            title1="";
                            count=0;
                            while(i<data.length&&count<3){
                                title1 = title1 + `<div class="col-myProfile-unlocked" >
                                    <div class="titleAndImage"> 
                                        <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                        <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                    </div> 
                                    <div class="text"> 
                                        <div class="status">Status:</div> 
                                        <form action="/plant_`+ data[i].name+`" method="post"> 
                                            <p> 
                                                <label class="container-checkbox"> 
                                                    <input name="task" type="checkbox" value="1" id="checkbox1">
                                                    <span class="checkmark"></span>`+ data[i].task1 +`
                                                </label>
                                                <label class="container-checkbox"> 
                                                    <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                    <span class="checkmark"></span>`+ data[i].task2 +`
                                                </label>
                                                <label class="container-checkbox"> 
                                                    <input name="task" type="checkbox" value="1" id="checkbox3">
                                                    <span class="checkmark"></span>`+ data[i].task3 +`
                                                </label>  
                                                <input type="submit" class="submitClass">
                                            </p>
                                        </form> 
                                    </div>
                                </div> `;
                                i++;
                                count++;
                            }
                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                            console.log(title);
                            document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                        }
                    })
                    .catch(err => console.log(err));

                    fetch("Plants-Intermediate", { 
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
                                    title1 = title1+`<div class="col-myProfile-locked" >
                                        <div class="titleAndImage"> 
                                            <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                            <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                        </div> 
                                        <div class="text"> 
                                            <div class="status">Status:</div> 
                                            <form action="/plant_`+ data[i].name+`" method="post"> 
                                                <p> 
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox1">
                                                        <span class="checkmark"></span>`+ data[i].task1 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                        <span class="checkmark"></span>`+ data[i].task2 +`
                                                    </label>
                                                    <label class="container-checkbox"> 
                                                        <input name="task" type="checkbox" value="1" id="checkbox3">
                                                        <span class="checkmark"></span>`+ data[i].task3 +`
                                                    </label>  
                                                    <input type="submit" class="submitClass">
                                                </p>
                                            </form> 
                                        </div>
                                    </div> `;
                                    i++;
                                    count++;
                                }
                                title=`<div class="row-myProfile">`+ title1+`</div>`;
                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", title);
                            }
                        })
                        .catch(err => console.log(err));
                        fetch("Plants-Advanced", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                const text=`<p> Plants for Advanced Level </p>`;
                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", text);
                                let i=0;
                                var title1="";
                                var title2="";
                                var title3="";
                                let count=0;
                    
                                while(i<data.length){
                                    title1="";
                                    count=0;
                                    while(i<data.length&&count<3){
                                        title1 = title1+`<div class="col-myProfile-locked" >
                                            <div class="titleAndImage"> 
                                                <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                            </div> 
                                            <div class="text"> 
                                                <div class="status">Status:</div> 
                                                <form action="/plant_`+ data[i].name+`" method="post"> 
                                                    <p> 
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox1">
                                                            <span class="checkmark"></span>`+ data[i].task1 +`
                                                        </label>
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                            <span class="checkmark"></span>`+ data[i].task2 +`
                                                        </label>
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox3">
                                                            <span class="checkmark"></span>`+ data[i].task3 +`
                                                        </label>  
                                                        <input type="submit" class="submitClass">
                                                    </p>
                                                </form> 
                                            </div>
                                        </div> `;
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
                fetch("Intermediate-response", { 
                    mode: 'no-cors' 
                })  .then(response => {return response.json()})
                    .then(data => {
                        var value=0;
                        for(let i=0;i<data.length;i++){
                            const task="task2_"+data[i].number;
                            console.log(person)
                            if(person[task]!=undefined&&person[task]!=null)
                                value=value+person[task];
                        }
                        numberForIntermediate=((value*100)/(4*data.length)).toFixed(2);
                    })
                    .catch(err => console.log(err));
            
                    if(numberForIntermediate!=100){
                        document.getElementById("my_level").insertAdjacentHTML("beforeend", "Intermediate");
                        document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForIntermediate+"%");
                        fetch("Plants-Beginner", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                let i=0;
                                var title1="";
                                var title2="";
                                let count=0;
                    
                                if(i<data.length){
                                    console.log(data[i].name, "  ")
                                    title1 = `<div class="col-myProfile-unlocked" >
                                                <div class="titleAndImage"> 
                                                    <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                    <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                </div> 
                                                <div class="text"> 
                                                    <div class="status">Status:</div> 
                                                    <form action="/plant_`+ data[i].name+`" method="post"> 
                                                        <p> 
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                <span class="checkmark"></span>`+ data[i].task1 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                <span class="checkmark"></span>`+ data[i].task2 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                <span class="checkmark"></span>`+ data[i].task3 +`
                                                            </label>  
                                                            <input type="submit" class="submitClass">
                                                        </p>
                                                    </form> 
                                                </div>
                                            </div> `;
                                }
                                i++;
                                if(i<data.length){
                                    title2 = `<div class="col-myProfile-unlocked" >
                                                <div class="titleAndImage"> 
                                                    <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                    <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                </div> 
                                                <div class="text"> 
                                                    <div class="status">Status:</div> 
                                                    <form action="/plant_`+ data[i].name+`" method="post"> 
                                                        <p> 
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                <span class="checkmark"></span>`+ data[i].task1 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                <span class="checkmark"></span>`+ data[i].task2 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                <span class="checkmark"></span>`+ data[i].task3 +`
                                                            </label> 
                                                            <input type="submit" class="submitClass"> 
                                                        </p>
                                                    </form> 
                                                </div>
                                            </div> `;
                                }
                                title=title1+title2;
                                document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                                i++;
                                while(i<data.length){
                                    title1="";
                                    count=0;
                                    while(i<data.length&&count<3){
                                        title1 = title1+`<div class="col-myProfile-unlocked" >
                                            <div class="titleAndImage"> 
                                                <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                            </div> 
                                            <div class="text"> 
                                                <div class="status">Status:</div> 
                                                <form action="/plant_`+ data[i].name+`" method="post"> 
                                                    <p> 
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox1">
                                                            <span class="checkmark"></span>`+ data[i].task1 +`
                                                        </label>
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                            <span class="checkmark"></span>`+ data[i].task2 +`
                                                        </label>
                                                        <label class="container-checkbox"> 
                                                            <input name="task" type="checkbox" value="1" id="checkbox3">
                                                            <span class="checkmark"></span>`+ data[i].task3 +`
                                                        </label> 
                                                        <input type="submit" class="submitClass"> 
                                                    </p>
                                                </form> 
                                            </div>
                                        </div> `;
                                        i++;
                                        count++;
                                    }
                                    title=`<div class="row-myProfile">`+ title1+`</div>`;
                                    document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                }
                            })
                            .catch(err => console.log(err));
        
                            fetch("Plants-Intermediate", { 
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
                                             title1 = title1+`<div class="col-myProfile-unlocked" >
                                                <div class="titleAndImage"> 
                                                    <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                    <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                </div> 
                                                <div class="text"> 
                                                    <div class="status">Status:</div> 
                                                    <form action="/plant_`+ data[i].name+`" method="post"> 
                                                        <p> 
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                <span class="checkmark"></span>`+ data[i].task1 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                <span class="checkmark"></span>`+ data[i].task2 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                <span class="checkmark"></span>`+ data[i].task3 +`
                                                            </label>  
                                                            <input type="submit" class="submitClass">
                                                        </p>
                                                    </form> 
                                                </div>
                                            </div> `;
                                            i++;
                                            count++;
                                        }
                                        title=`<div class="row-myProfile">`+ title1+`</div>`;
                                        console.log(title);
                                        document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                    }
                                })
                                .catch(err => console.log(err));
                                fetch("Plants-Advanced", { 
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
                                                title1 = title1+`<div class="col-myProfile-locked" >
                                                    <div class="titleAndImage"> 
                                                        <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                        <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                    </div> 
                                                    <div class="text"> 
                                                        <div class="status">Status:</div> 
                                                        <form action="/plant_`+ data[i].name+`" method="post"> 
                                                            <p> 
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                    <span class="checkmark"></span>`+ data[i].task1 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                    <span class="checkmark"></span>`+ data[i].task2 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                    <span class="checkmark"></span>`+ data[i].task3 +`
                                                                </label>  
                                                                <input type="submit" class="submitClass">
                                                            </p>
                                                        </form> 
                                                    </div>
                                                </div> `;
                                                i++;
                                                count++;
                                            }
                                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                                            console.log(title);
                                            document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", title);
                                        }
                                    })
                                    .catch(err => console.log(err));
                    }
                    else{
                        var numberForAdvanced=0;
                        fetch("Advanced-response", { 
                            mode: 'no-cors' 
                        })  .then(response => {return response.json()})
                            .then(data => {
                                var value=0;
                                for(let i=0;i<data.length;i++){
                                    const task="task3_"+data[i].number;
                                    console.log(person)
                                    if(person[task]!=undefined&&person[task]!=null)
                                        value=value+person[task];
                                }
                                numberForAdvanced=((value*100)/(4*data.length)).toFixed(2);
                            })
                            .catch(err => console.log(err));
                            document.getElementById("my_level").insertAdjacentHTML("beforeend", "Advanced");
                            document.getElementById("my_percentage").insertAdjacentHTML("beforeend", numberForAdvanced+"%");

                            fetch("Plants-Beginner", { 
                                mode: 'no-cors' 
                            })  .then(response => {return response.json()})
                                .then(data => {
                                    let i=0;
                                    var title1="";
                                    var title2="";
                                    let count=0;
                        
                                    if(i<data.length){
                                        title1 = `<div class="col-myProfile-unlocked" >
                                                    <div class="titleAndImage"> 
                                                        <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                        <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                    </div> 
                                                    <div class="text"> 
                                                        <div class="status">Status:</div> 
                                                        <form action="/plant_`+ data[i].name+`" method="post"> 
                                                            <p> 
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                    <span class="checkmark"></span>`+ data[i].task1 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                    <span class="checkmark"></span>`+ data[i].task2 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                    <span class="checkmark"></span>`+ data[i].task3 +`
                                                                </label> 
                                                                <input type="submit" class="submitClass"> 
                                                            </p>
                                                        </form> 
                                                    </div>
                                                </div> `;
                                    }
                                    i++;
                                    if(i<data.length){
                                        title2 = `<div class="col-myProfile-unlocked" >
                                                    <div class="titleAndImage"> 
                                                        <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                        <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                    </div> 
                                                    <div class="text"> 
                                                        <div class="status">Status:</div> 
                                                        <form action="/plant_`+ data[i].name+`" method="post"> 
                                                            <p> 
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                    <span class="checkmark"></span>`+ data[i].task1 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                    <span class="checkmark"></span>`+ data[i].task2 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                    <span class="checkmark"></span>`+ data[i].task3 +`
                                                                </label>  
                                                                <input type="submit" class="submitClass">
                                                            </p>
                                                        </form> 
                                                    </div>
                                                </div> `;
                                    }
                                    title=title1+title2;
                                    document.getElementById("col-myProfile-unlocked-2").insertAdjacentHTML("beforeend", title);
                                    i++;
                                    while(i<data.length){
                                        title1="";
                                        count=0;
                                        while(i<data.length&&count<3){
                                            title1 = title1+`<div class="col-myProfile-unlocked" >
                                                <div class="titleAndImage"> 
                                                    <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                    <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                </div> 
                                                <div class="text"> 
                                                    <div class="status">Status:</div> 
                                                    <form action="/plant_`+ data[i].name+`" method="post"> 
                                                        <p> 
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                <span class="checkmark"></span>`+ data[i].task1 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                <span class="checkmark"></span>`+ data[i].task2 +`
                                                            </label>
                                                            <label class="container-checkbox"> 
                                                                <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                <span class="checkmark"></span>`+ data[i].task3 +`
                                                            </label>  
                                                            <input type="submit" class="submitClass">
                                                        </p>
                                                    </form> 
                                                </div>
                                            </div> `;
                                            i++;
                                            count++;
                                        }
                                        title=`<div class="row-myProfile">`+ title1+`</div>`;
                                        console.log(title);
                                        document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                    }
                                })
                                .catch(err => console.log(err));
            
                                fetch("Plants-Intermediate", { 
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
                                                title1 = title1+`<div class="col-myProfile-unlocked" >
                                                    <div class="titleAndImage"> 
                                                        <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                        <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                    </div> 
                                                    <div class="text"> 
                                                        <div class="status">Status:</div> 
                                                        <form action="/plant_`+ data[i].name+`" method="post"> 
                                                            <p> 
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                    <span class="checkmark"></span>`+ data[i].task1 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                    <span class="checkmark"></span>`+ data[i].task2 +`
                                                                </label>
                                                                <label class="container-checkbox"> 
                                                                    <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                    <span class="checkmark"></span>`+ data[i].task3 +`
                                                                </label>  
                                                                <input type="submit" class="submitClass">
                                                            </p>
                                                        </form> 
                                                    </div>
                                                </div> `;
                                                i++;
                                                count++;
                                            }
                                            title=`<div class="row-myProfile">`+ title1+`</div>`;
                                            document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                        }
                                    })
                                    .catch(err => console.log(err));
                                    fetch("Plants-Advanced", { 
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
                                                    title1 = title1+`<div class="col-myProfile-unlocked" >
                                                        <div class="titleAndImage"> 
                                                            <img src="images/`+ data[i].image+ `.png" alt="Eroare"> 
                                                            <div class="col-myProfile-unlocked-title">`+data[i].name +`</div> 
                                                        </div> 
                                                        <div class="text"> 
                                                            <div class="status">Status:</div> 
                                                            <form action="/plant_`+ data[i].name+`" method="post"> 
                                                                <p> 
                                                                    <label class="container-checkbox"> 
                                                                        <input name="task" type="checkbox" value="1" id="checkbox1">
                                                                        <span class="checkmark"></span>`+ data[i].task1 +`
                                                                    </label>
                                                                    <label class="container-checkbox"> 
                                                                        <input name="task" type="checkbox" value="1" id="checkbox2"> 
                                                                        <span class="checkmark"></span>`+ data[i].task2 +`
                                                                    </label>
                                                                    <label class="container-checkbox"> 
                                                                        <input name="task" type="checkbox" value="1" id="checkbox3">
                                                                        <span class="checkmark"></span>`+ data[i].task3 +`
                                                                    </label>  
                                                                    <input type="submit" class="submitClass">
                                                                </p>
                                                            </form> 
                                                        </div>
                                                    </div> `;

                                                    i++;
                                                    count++;
                                                }
                                                title=`<div class="row-myProfile">`+ title1+`</div>`;
                                                document.getElementById("rowForPlants").insertAdjacentHTML("beforeend", title);
                                                document.getElementById("rowForPlantsLocked").insertAdjacentHTML("beforeend", "You have all plants!");
                                            }
                                        })
                                        .catch(err => console.log(err));
                    }
            }
        })
        .catch(err => console.log(err));
})
.catch(err => console.log(err));