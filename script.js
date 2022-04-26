var selectedRow = null;
var body = document.getElementById("tbody");
var newArray;

const sessionValueCheck = () => {
  newArray = JSON.parse(sessionStorage.getItem("data"));
  newArray = newArray == null ? [] : newArray;
  return newArray;
};

const loadFile = (event) => {
  var image = document.getElementById("file");
  document.getElementById("output").style.display = "block";
  if (event.files && event.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("output").src = e.target.result;
    };
    image.src = reader.readAsDataURL(event.files[0]);
  }
};

const removeWarning = () => {
  document.getElementById("name_error").innerHTML = " ";
  document.getElementById("fullName").style.borderColor = "black";
};

const readFormData = () => {
  var formData = {};
  newArray = sessionValueCheck();
  if (newArray.length > 0) {
    formData.Id = newArray.slice(-1)[0].Id + 1;
  } else {
    formData.Id = 1;
  }
  formData.fullName = document.getElementById("fullName").value;
  formData.age = document.getElementById("age").value;
  formData.file = document.getElementById("output").src;
  formData.deletedAt = false;
  return formData;
};

const insertNewRecord = (data) => {
  newArray = sessionValueCheck();
  newArray.push(data);
  sessionStorage.setItem("data", JSON.stringify(newArray));
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  onload();
};

const resetForm = () => {
  document.getElementById("fullName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("output").src = "";
  selectedRow = null;
};

const onEdit = (id) => {
  newArray = sessionValueCheck();
  selectedRow = id;
  const editObj = newArray.find((obj) => obj.Id === id);
  document.getElementById("fullName").value = editObj.fullName;
  document.getElementById("age").value = editObj.age;
  document.getElementById("output").src = editObj.file;
};

const updateRecord = (formData) => {
  newArray = sessionValueCheck();
  const editObj = newArray.find((obj) => obj.Id === selectedRow);
  editObj.fullName = formData.fullName;
  editObj.age = formData.age;
  editObj.file = formData.file;
  const data = newArray.map((obj) => (obj.Id === selectedRow ? editObj : obj));
  sessionStorage.setItem("data", JSON.stringify(data));
  selectedRow = null;
  onload();
};

const onDelete = (id) => {
  if (confirm("Are you sure to delete this record ?")) {
    newArray = sessionValueCheck();
    let data = newArray.find((obj) => obj.Id === id);
    data.deletedAt = true;
    const newData = newArray.map((obj) => (obj.Id === id ? data : obj));
    sessionStorage.setItem("data", JSON.stringify(newData));
    onload();
  }
};

const onload = () => {
  newArray = sessionValueCheck();
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  if (newArray.length > 0) {
    array = [...newArray];
    newArray.map((obj) => {
      if (obj.deletedAt === false) {
        var table = document
          .getElementById("employeeList")
          .getElementsByTagName("tbody")[0];
        var newRow = table.insertRow(table.rows.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = obj.Id;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = obj.fullName;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = obj.age;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<img src=\"${obj.file}\" width=\"100px\">`;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a onClick="onEdit(${obj.Id})">Edit</a>
                       <a onClick="onDelete(${obj.Id})">Delete</a>`;
      }
    });
  }
};

document.onload = onload();
