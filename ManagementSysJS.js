
let records = JSON.parse(localStorage.getItem("records")) || [];
let deletedRecords = JSON.parse(localStorage.getItem("deletedRecords")) || [];
let editIndex = -1;

// Clean up empty records from localStorage
function cleanupData() {
  records = records.filter(rec => rec && typeof rec === 'object' && rec.name);
  deletedRecords = deletedRecords.filter(rec => rec && typeof rec === 'object' && rec.name);
  
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("deletedRecords", JSON.stringify(deletedRecords));
  
  console.log("Cleaned records:", records);
  console.log("Cleaned deletedRecords:", deletedRecords);
}

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

//DISPLAY DELETED RECORDS
function displayDeleted(data = deletedRecords) {
  console.log("displayDeleted called with:", data);
  console.log("deletedRecords from localStorage:", JSON.parse(localStorage.getItem("deletedRecords")));
  const table = document.getElementById("DeletedRecordTable");
  if (!table) {
    console.log("DeletedRecordTable not found");
    return;
  }
  table.innerHTML = "";
  
  if (data.length === 0) {
    table.innerHTML = '<tr><td colspan="5">No deleted records found</td></tr>';
    return;
  }

  data.forEach((rec, index) => {
    // Skip empty records
    if (!rec || typeof rec !== 'object') {
      console.log("Skipping invalid record at index", index, ":", rec);
      return;
    }
    
    let row = `<tr>
      <td>${rec.name || 'N/A'}</td>
      <td>${rec.StudentNumber || 'N/A'}</td>
      <td>${rec.YearLevel || 'N/A'}</td>
      <td>${rec.Course || 'N/A'}</td>
      <td>
        <button class="restore-btn" onclick="restoreRecord(${index})">Restore</button>
        <button class="permanentlydelete-btn" onclick="permanentlyDeleteRecord(${index})">Permantly Delete</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });

}


// DELETE RECORD
function deleteRecord(index) {
  // Checking 
  if (index >= 0 && index < records.length && records[index]) {
    deletedRecords.push(records[index]);   
    records.splice(index, 1);              

    localStorage.setItem("records", JSON.stringify(records));
    localStorage.setItem("deletedRecords", JSON.stringify(deletedRecords));

    displayRecords();
    displayDeleted();
  } else {
    console.error("Invalid record index:", index);
  }
}
// PERMANENTLY DELETE
function permanentlyDeleteRecord(index) {
  deletedRecords.splice(index, 1);
  localStorage.setItem("deletedRecords", JSON.stringify(deletedRecords));
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
};


// EDIT RECORD
function editRecord(index) {
  document.getElementById("name").value = records[index].name;
  document.getElementById("StudentNumber").value = records[index].StudentNumber;
  document.getElementById("YearLevel").value = records[index].YearLevel;
  document.getElementById("Course").value = records[index].Course;
  editIndex = index;
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

  // Clear after saving
  document.getElementById("name").value = "";
  document.getElementById("StudentNumber").value = "";
  document.getElementById("YearLevel").value = "";
  document.getElementById("Course").value = "";
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


// displays 
cleanupData();
displayRecords();
displayDeleted();

