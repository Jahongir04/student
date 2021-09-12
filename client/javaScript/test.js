let forms = document.querySelectorAll(".needs-validation");
let student = {};
let pageNumber = 0;
let pages = document.getElementById("pages");
let button = "";
let col = document.getElementById("column");
var totalPage = 0;
let search = 0;
let pageSize = 10;
let post = "http://localhost:8080/api/student/add";
let output = "";
let tbody = document.querySelector('tbody');
let input = "";

ApiCall(pageNumber);
// for validation
Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add("was-validated");
        e.preventDefault();
        formElements();
    }, false);
});
// finish validation

// for create new student
var btn = document.getElementById('btn');

function formElements(e) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        getFormValues();
        if (student.name !== "" && student.surname !== "" && student.fatherName !== "" && student.age !== 0 && student.region !== "") {
            console.log(student);
            fetch(post, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
                .then(res => {
                        output = "";
                        head = "";
                        document.getElementById("close").click();
                        search=0;
                        document.getElementById("form").reset();
                        ApiCall(pageNumber)
                    }
                )
        }
    });
}

// get form input values
function getFormValues() {
    const elements = document.getElementById("form").elements;
    student = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        if (item.name === 'age') {
            console.log(item.value);
            student[item.name] = item.value;
        } else {
            student[item.name] = item.value;
        }
    }
}

//for call student list
function ApiCall(pageNumber) {
    search = 0;
    output = "";
    var get = 'http://localhost:8080/api/student/list?pageSize=' + pageSize + '&pageNumber=' + pageNumber;
    fetch(get).then(res => res.json())
        .then(data => {
            console.log(data);
            totalPage = data.totalPages;
            writeTable(data, totalPage);
        })
}

function deleteFun(id, e) {
    let sure=confirm("Are you sure?");
    if (sure){
        fetch('http://localhost:8080/api/student/delete/' + id, {
            method: 'DELETE',
        })
            .then(res => {
                ApiCall(pageNumber);
            })
    }
}

function searchTable() {
    pageNumber = 0;
    search = 1;
    input=document.getElementById("form1").value;
    console.log(input);
    fetch("http://localhost:8080/api/student/page?pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&search=" + input).then(res => res.json())
        .then(data => {
            totalPage = data.totalPages;
            writeTable(data, totalPage);
        })
}

function writeTable(data, totalPage) {
    console.log(data)
    output = "";
    let button = "";
    for (let i = 0; i < data.content.length; i++) {
        let count = i;
        output += `<tr>
        <td>${count + 1}</td>
        <td>${data.content[i].name}</td>
        <td>${data.content[i].surname}</td>
        <td>${data.content[i].fatherName}</td>
        <td>${data.content[i].age}</td>
        <td>${data.content[i].region}</td>
        <td>${data.content[i].course}</td>
        ` +
            `<td><button type="submit" onclick="deleteFun('${data.content[i].id.toString()}')" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
    }
    tbody.innerHTML = output;
    console.log(pageNumber + "va" + totalPage);
    if (pageNumber == 0) {
        button += `<button class="btn btn-default d-none" onclick="changePage(0)">First</button>`
    } else {
        button += `<button id="first" class="btn btn-default" onclick="changePage(0)">First</button>`
    }

    for (let i = 0; i < totalPage; i++) {
        button += `<button class="btn btn-default" onclick="changePage(${i})">${i + 1}</button>`
    }
    if (pageNumber == totalPage - 1) {
        button += `<button  class="btn btn-default d-none" onclick="changePage(${data.totalPages})">Last</button>`
    } else {
        button += `<button id="last" class="btn btn-default" onclick="changePage(${data.totalPages-1})">Last</button>`
    }

    col.innerHTML = button;
    let message = `<span>${pageNumber + 1} page from ${totalPage} pages</span>`
    pages.innerHTML = message;
}

function changePage(number) {
    pageNumber = number;
    if (search == 0) {
        fetch("http://localhost:8080/api/student/list?pageSize=" + pageSize + "&pageNumber=" + pageNumber)
            .then(res => res.json())
            .then(data => {
                totalPage = data.totalPages;
                writeTable(data, totalPage);
            })
    }else{
        console.log("search")
        fetch("http://localhost:8080/api/student/page?pageSize=" + pageSize + "&pageNumber=" + pageNumber+"&search="+input).then(res=> res.json())
            .then(data=>{
                totalPage = data.totalPages;
                writeTable(data, totalPage);
            })
    }
}
