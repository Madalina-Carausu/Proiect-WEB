var navLinks = document.getElementById("navLinks");
function showMenu() {
    navLinks.style.right="0";
}
function hideMenu() {
    navLinks.style.right="-200px";
}
const divAdvanced = document.getElementById("divForAdvanced");
fetch("Advanced-response", { 
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
                
                if(count==0){
                    title1 = `<a href="./modules/Advanced`+data[i].number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+data[i].number+`" value=`+data[i].maxPoints+ `></p>`+ `</a>`;
                }
                else
                if(count==1){
                    title2 = `<a href="./modules/Advanced`+data[i].number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+data[i].number+`" value=`+data[i].maxPoints+ `></p>`+ `</a>`;
                }
                else{
                    title3 = `<a href="./modules/Advanced`+data[i].number+`.html"`+ ` class="lesson-col-advanced">`+
                    `<h3>`+data[i].display+ `</h3>` + `<p id="m3-`+data[i].number+`" value=`+data[i].maxPoints+ `></p>`+ `</a>`;
                }
                count++;
                i++;
            }
            const title=`<div class="row">`+title1+title2+title3+`</div>`
            divAdvanced.insertAdjacentHTML("beforeend", title)
        }
    })
    .catch(err => console.log(err));



    fetch("response-module", { 
        mode: 'no-cors' // 'cors' by default
    })  .then(response => {return response.json()})
        .then(data => {
            if(data!=null)
            {
                for(let i=1;i<7;i++){
                    document.getElementById("m3-"+i).insertAdjacentHTML("beforeend", "0%");
                }
            }
           
        })
        .catch(err => console.log(err));