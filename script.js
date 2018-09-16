"use-strict";

const endpoint = "data.json";

const studentContainer = document.querySelector("#students-container");
const studentTemplate = document.querySelector("#students-template").content;
var studentArray = [];
var sortedArray = [];

function fetchAllStudents() {
  fetch(endpoint)
    .then(e => e.json())
    .then(students => showAllStudents(students));
}
function showAllStudents(students) {
  students.forEach(showEachStudent);
}
function showEachStudent(student) {
  let clone = studentTemplate.cloneNode(true);
  const name = student;
  var i = name.length - 1;
  while (name[i - 1] != " ") {
    i--;
  }
  var lastName = name.substring(i, name.length);
  var firstName = name.substring(0, i - 1);
  clone.querySelector(".student-last-name").textContent = lastName;
  clone.querySelector(".student-first-name").textContent = firstName;
  studentArray.push(firstName);
  studentContainer.appendChild(clone);
}

document.querySelector("#first-name").onclick = function sortStudents() {
  var firstName = document.getElementsByClassName("student-first-name");
  var lastName = document.getElementsByClassName("student-last-name");
  var details = document.getElementsByClassName("student-details");
  var students = [];
  for (var i = 0; i < firstName.length; i++) {
    students.push({
      first: firstName[i].textContent,
      last: lastName[i].textContent,
      detail: details[i].textContent
    });
  }

  var byName = students.slice(0);
  byName.sort(function(a, b) {
    var x = a.first.toLowerCase();
    var y = b.first.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  for (var j = 0; j < firstName.length; j++) {
    firstName[j].textContent = byName[j].first;
    lastName[j].textContent = byName[j].last;
  }
};

document.querySelector("#last-name").onclick = function sortStudents() {
  var firstName = document.getElementsByClassName("student-first-name");
  var lastName = document.getElementsByClassName("student-last-name");
  var details = document.getElementsByClassName("student-details");
  var students = [];
  for (var i = 0; i < firstName.length; i++) {
    students.push({
      first: firstName[i].textContent,
      last: lastName[i].textContent,
      detail: details[i].textContent
    });
  }

  var byName = students.slice(0);
  byName.sort(function(a, b) {
    var x = a.last.toLowerCase();
    var y = b.last.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  for (var j = 0; j < firstName.length; j++) {
    firstName[j].textContent = byName[j].first;
    lastName[j].textContent = byName[j].last;
  }
};

document.querySelector(".delete-button").onclick = function deleteIt() {
  var students = document.getElementsByClassName("student");
  var studentCheck = document.getElementsByName("student-check");
  var selectedStudents = [];

  for (i = 0; i < students.length; i++) {
    if (studentCheck[i].checked) {
      selectedStudents.push(students[i]);
    } else {
    }
  }
  for (var i = 0; i < students.length; i++) {
    for (var j = 0; j < selectedStudents.length; j++) {
      if (students[i] == selectedStudents[j]) {
        students[i].remove();
      }
    }
  }
};

fetchAllStudents();

function doDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".sort")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

let modal = document.querySelector(".modal");

function showModal() {
  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  let modal = document.querySelector(".modal");
  if (evt.keyCode == 27) {
    modal.style.display = "none";
  }
};
