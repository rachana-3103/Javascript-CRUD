document.getElementById("formname").onFormSubmit = function () {
  var fullName = document.forms["formname"]["fullName"].value;
  isValid = true;
  for (var i = 0, len = fullName.length; i < len; ++i) {
    if (fullName.charAt(i) === " ") {
      isValid = false;
      document.getElementById("name_error").innerHTML =
        "White Space Not Allowed.";
      break;
    }
  }

  if (fullName == "" || fullName == null) {
    isValid = false;
    document.getElementById("name_error").innerHTML = "Please enter fullname.";
    document.getElementById("fullName").style.borderColor = "red";
  }

  if (document.getElementById("name_error").innerHTML == " ") {
    isValid = true;
    var formData = readFormData();
    if (selectedRow == null) {
      insertNewRecord(formData);
    } else {
      updateRecord(formData);
    }
    resetForm();
  }
  return isValid;
};

document.getElementById("fullName").onkeyup = removeWarning;
