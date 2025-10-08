
let records = JSON.parse(localStorage.getItem("records")) || [];
let deletedRecords = JSON.parse(localStorage.getItem("deletedRecords")) || [];
let editIndex = -1;

//DISPLAY ACTIVE RECORDS
function displayRecords(data = records) {
  const table = document.getElementById("recordTable");
  if (!table) return; 
  table.innerHTML = "";

  data.forEach((rec, index) => {
    let row = `<tr>
      <td>${rec.name}</td>
      <td>${rec.StudentNumber}</td>
      <td>${rec.YearLevel}</td>
      <td>${rec.Course}</td>
      <td>
        <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}


function displayDeleted(data = deletedRecords) {
  const table = document.getElementById("DeletedRecordTable");
  if (!table) return; // 
  table.innerHTML = "";

  data.forEach((rec, index) => {
    let row = `<tr>
      <td>${rec.name}</td>
      <td>${rec.StudentNumber}</td>
      <td>${rec.YearLevel}</td>
      <td>${rec.Course}</td>
      <td>
        <button class="restore-btn" onclick="restoreRecord(${index})">Restore</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });

}



// DELETE RECORD
function deleteRecord(index) {
  deletedRecords.push(records[index]);   
  records.splice(index, 1);              

  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("deletedRecords", JSON.stringify(deletedRecords));

  displayRecords();
  displayDeleted(); 
}

// RESTORE RECORD
function restoreRecord(index) {
  records.push(deletedRecords[index]);   
  deletedRecords.splice(index, 1);

  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("deletedRecords", JSON.stringify(deletedRecords));

  displayRecords();
  displayDeleted();
}

// SAVE  / EDIT RECORD
function saveRecord() {
  const name = document.getElementById("name").value;
  const StudentNumber = document.getElementById("StudentNumber").value;
  const YearLevel = document.getElementById("YearLevel").value;
  const Course = document.getElementById("Course").value;

  if (name === "" || StudentNumber === "" || YearLevel === "" || Course === "") {
    alert("Please fill all fields");
    return;
  }

  if (editIndex === -1) {
    records.push({ name, StudentNumber, YearLevel, Course });
  } else {
    records[editIndex] = { name, StudentNumber, YearLevel, Course };
    editIndex = -1;
  }

  localStorage.setItem("records", JSON.stringify(records));
  displayRecords();

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("StudentNumber").value = "";
  document.getElementById("YearLevel").value = "";
  document.getElementById("Course").value = "";
}

// EDIT RECORD
function editRecord(index) {
  document.getElementById("name").value = records[index].name;
  document.getElementById("StudentNumber").value = records[index].StudentNumber;
  document.getElementById("YearLevel").value = records[index].YearLevel;
  document.getElementById("Course").value = records[index].Course;
  editIndex = index;
}

// SEARCH 
function searchRecords() {
  let keyword = document.getElementById("search").value.toLowerCase();
  let filtered = records.filter(rec =>
    rec.name.toLowerCase().includes(keyword) ||
    rec.StudentNumber.toLowerCase().includes(keyword) ||
    rec.YearLevel.toLowerCase().includes(keyword) ||
    rec.Course.toLowerCase().includes(keyword)
  );
  displayRecords(filtered);
}


displayRecords();
displayDeleted();
