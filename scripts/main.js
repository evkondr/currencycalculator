window.onload=function(){
    
   let createOption=(val, obj)=>{
       let option=document.createElement("OPTION");
       option.value=val;
       option.textContent=obj.Name;
       return option;
   }
    
    let getJsonFile=(url)=>{
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
        for(item in valute){
            valute1.appendChild(createOption(item,valute[item]));
            valute2.appendChild(createOption(item,valute[item]));
        }
    });
    
}