var forms=document.querySelectorAll(".needs-validation");
var student={};
var pageNumber=0;
var totalPage=0;
var pageSize=10;
var post="http://localhost:8080/api/student/add";
var output="";
var tbody=document.querySelector('tbody');

ApiCall(pageNumber);
    //next page
    let next=document.getElementById("next");
      next.addEventListener('click',function(e){
         e.preventDefault();
         prev.disabled=false;
         console.log(totalPage);
         if(pageNumber==totalPage-1){
             pageNumber=totalPage-1;
         }else{
            pageNumber=pageNumber+1;
            if(pageNumber==totalPage-1){
                next.disabled=true;
            }
         }
         ApiCall(pageNumber);
    })
// prev page
    let prev=document.getElementById('prev');
       prev.addEventListener('click',function(e){
       e.preventDefault();
       next.disabled=false;
       if(pageNumber==0){
           pageNumber=0;
       }else{
           pageNumber=pageNumber-1;
           if(pageNumber==0){
               prev.disabled=true;
           }
       }
       ApiCall(pageNumber);
})
// for validation
Array.prototype.slice.call(forms).forEach(function(form){
    form.addEventListener('submit',function(e){
     if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
     }
     form.classList.add("was-validated");
     e.preventDefault();
     formElements(); 
       },false);   
   });
   // finish validation

// for create new student
var btn=document.getElementById('btn');
function formElements(e){
    btn.addEventListener('click',function(e){
        e.preventDefault();
        getFormValues();
        if(student.name!==""&&student.surname!==""&&student.fatherName!==""&&student.age!==0&&student.region!==""){
            console.log(student);
            fetch(post,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            .then(res=> {
                output="";
                head="";
                window.location.reload();
                document.getElementById("form").reset(); 
            
            }
            )
            }
    })  ;
}
// get form input values
function getFormValues(){
    const elements = document.getElementById("form").elements;
    student ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if(item.name==='age'){
            console.log(item.value);
            student[item.name] = item.value; 
        }else{
        student[item.name] = item.value;
        }
    }
}
//for call student list
function ApiCall(pageNumber){
    output="";
    var get='http://localhost:8080/api/student/list?pageSize='+pageSize+'&pageNumber='+pageNumber;
    fetch(get).then(res=> res.json())
    .then(data=> {
        console.log(data);
        totalPage=data.totalPages;
        for (let i = 0; i < data.content.length; i++) {
            let count =i;
            output+=`<tr>
            <td>${count+1}</td>
            <td>${data.content[i].name}</td>
            <td>${data.content[i].surname}</td>
            <td>${data.content[i].fatherName}</td>
            <td>${data.content[i].age}</td>
            <td>${data.content[i].region}</td>
            <td>${data.content[i].course}</td>
            `+
            `<td><button type="submit" value="${data.content[i].name}" onclick="deleteFun('${data.content[i].id.toString()}')" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
        }
        tbody.innerHTML=output;
    })
}
function deleteFun(id,e){
    fetch('http://localhost:8080/api/student/delete/' + id, {
  method: 'DELETE',
})
.then(res=>{
    ApiCall(pageNumber);
})
}
function searchTable(){
    console.log("it's working");
    var input=document.getElementById("form1").value;
    console.log(input);
    var returned=[];
    fetch("http://localhost:8080/api/student/all").then(res=> res.json())
    .then(data=> {
        console.log(data);
       for (let i = 0; i < data.length; i++) {
           var name=data[i].name;
        if(data[i].name.includes(input)||data[i].surname.includes(input)||data[i].fatherName.includes(input)||data[i].course==input||data[i].region.includes(input)){
            returned.push(data[i]);
            console.log("hi");
        }
       }
       console.log(returned);
       output="";
       for (let i = 0; i < returned.length; i++) {
        let count =i;
        output+=`<tr>
        <td>${count+1}</td>
        <td>${returned[i].name}</td>
        <td>${returned[i].surname}</td>
        <td>${returned[i].fatherName}</td>
        <td>${returned[i].age}</td>
        <td>${returned[i].region}</td>
        <td>${returned[i].course}</td>
        `+
        `<td><button type="submit" onclick="deleteFun('${returned[i].id.toString()}')" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
    }
    tbody.innerHTML=output;
  })
}

 