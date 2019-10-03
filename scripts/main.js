window.onload=function(){
    
    //This function adds OPTION element to SELECT
    //sets OPTION value as value of object
    //and sets OPTION text as object's property "Name";
    
   let createOption=(val, obj)=>{
       let option=document.createElement("OPTION");
       option.value=val;
       option.textContent=obj.Name;
       return option;
   }
   
   //This func gets JSON file with currency rates using AJAX
    let getJsonFile=url=>{
        return new Promise((resolve,reject)=>{
           let xhr=new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.responseType="json";
            xhr.addEventListener("load",()=>{
                resolve(xhr.response);
            })
            xhr.addEventListener("error",()=>{
                reject("Не удалось загрузить файл");
            });
            xhr.send();
        });
    };
    
    getJsonFile("https://www.cbr-xml-daily.ru/daily_json.js").then((response)=>{
        let jsonFile=response;
        let valute=response.Valute;
        let val1="default", val2="default", res=0;
        let currDate=new Date(jsonFile.Date);
        document.querySelector(".date p").textContent=currDate.toLocaleString("ru",{year: 'numeric',month: 'long', day: 'numeric', timezone: 'UTC'});
        siteName.textContent="www.cbr-xml-daily.ru";
        for(item in valute){
            valute1.appendChild(createOption(item,valute[item]));
            valute2.appendChild(createOption(item,valute[item]));
        }
        valute1.addEventListener("change", e=>{
            val1=e.target.value;                   
        });
        valute2.addEventListener("change", e=>{
            val2=e.target.value;
        });
        calculate.addEventListener("click",e=>{
            e.preventDefault();
            if(val1=="default" || val2=="default"){
                err.textContent="Невыбрана валюта";
            }else{
                err.textContent="";
                if(/\d/g.test(amount.value)){
                    res=(amount.value*(valute[val1].Value/valute[val1].Nominal)/(valute[val2].Value/valute[val2].Nominal)).toFixed(4);
                    result.value=res;
                }else{
                    err.textContent="Введите сумму цифрами";
                }
                 
            }
            
        })
    });
    
}