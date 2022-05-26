var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.right="0";
}
function hideMenu() {
    navLinks.style.right="-200px";
}
const divAdvanced = document.getElementById("divForAdvanced");
fetch("Advanced-response", { 
    mode: 'no-cors'
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
                    title1 = `<a href="./modules/Advanced`+number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                }
                else
                if(count==1){
                    title2 = `<a href="./modules/Advanced`+number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                }
                else{
                    title3 = `<a href="./modules/Advanced`+number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+number+`" value=`+maxPoints+ `></p>`+ `</a>`;
                }

                fetch("username-database-response", { 
                    mode: 'no-cors' // 'cors' by default
                })  .then(response => {return response.json()})
                    .then(data => {
                        const task="task3_"+number;
                        if(data!=null&&data!=undefined&&data!="Eroare"&&data[task]!=undefined&&data[task]!=null)
                            document.getElementById("m3-"+number).insertAdjacentHTML("beforeend", (data[task]*100/maxPoints)+"%");
                        else
                            document.getElementById("m3-"+number).insertAdjacentHTML("beforeend", "0%");
                    })
                    .catch(err => console.log(err));
                count++;
                i++; 
            }
            const title=`<div class="row">`+title1+title2+title3+`</div>`
            divAdvanced.insertAdjacentHTML("beforeend", title)
        }
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