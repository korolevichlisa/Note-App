const addBox = document.querySelector(".btn_add"),
  addNote = document.querySelector(".add-note"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");
const totalNote = document.querySelector(".total-note");
const totalUl = document.querySelector(".total-ul");

// var notes = [];
let isUpdate = false,updateId;
var isArchive = false,
  archiveId;
var notes = [
  {
    title: "shoping",
    date: "2/3/2023",
    category: "Task",
    description: "tomato, soda",
    status: true,
  },
  {
    title: "books",
    date: "15/7/2023",
    category: "Task",
    description: "white silent",
    status: true,
  },
  {
    title: "sport",
    date: "20/6/2023",
    category: "Task",
    description: "find new video",
    status: true,
  },
  {
    title: "english",
    date: "17/3/2023",
    category: "Task",
    description: "10 words",
    status: true,
  },
  {
    title: "new feature",
    date: "23/3/2023",
    category: "Idea",
    description: "implement new ...",
    status: true,
  },
  {
    title: "new program",
    date: "12/3/2023",
    category: "Idea",
    description: "make program",
    status: true,
  },
  {
    title: "avocado",
    date: "2/5/2023",
    category: "Random Thought",
    description: "avocado leaf",
    status: true,
  },
];

var data = ["Task", "Random Thought", "Idea"];

const categoryDropDown = document.getElementById("selector");
for (let key in data) {
  let option = document.createElement("option");
  option.setAttribute("value", data[key]);

  let optionText = document.createTextNode(data[key]);
  option.appendChild(optionText);

  categoryDropDown.appendChild(option);
}

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach(li => li.remove());

  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
  <div class="details">
      <p>${note.title}</p>
      <p>${note.category}</p>
      <p>${filterDesc}</p>
  </div>
  <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
          <ul class="menu">
              <li onclick="updateNote(${id}, '${note.title}', '${note.category}', '${filterDesc}')"><i class="fas fa-pen"></i></li>
              <li onclick="deleteNote(${id})"><i class="fas fa-trash"></i></li>
              <li classs="archive" "onclick=editNote"  ><i class="far fa-file-archive"></i></li>
            </ul>
      </div>
  </div>
</li>`;
addNote.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  showNotes();
}

function updateNote(noteId, title, category, description) {
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  categoryDropDown.value = category;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}
var boxes = document.querySelectorAll(".note");


  for (const box of boxes) {
    box.addEventListener("click", function handleClick() {
      box.classList.toggle("checked");
    });
  }


function totalTabel(e) {
  var countTask = 0,
    countTaskArchived = 0,
    countRandom = 0,
    countRandomArchived = 0,
    countIdea = 0,
    countIdeaArchived = 0;

    notes?.map((note) => {
    switch (note.category) {
      case "Task":
        if (note.status == false) {
          countTaskArchived += 1;
        } else {
          countTask += 1;
        }
        break;
      case "Idea":
        if (note.status == true) {
          countIdea += 1;
        } else {
          countIdeaArchived += 1;
        }
        break;
      case "Random Thought":
        if (note.status == true) {
          countRandom += 1;
        } else {
          countRandomArchived += 1;
        }
        break;
    }
  });

  document.querySelectorAll(".note_count").forEach((li) => li.remove());

  let liTag = `<li class="note_count">
  <div class="details">
  <p>Task</p>
  <p>Idea</p>
  <p>Random Thought</p>
      
      
  </div>
  <div class="details">
    <p>${countTask}</p>
      <p>${countIdea}</p>
      <p>${countRandom}</p>
  </div>
  <div class="details">
  <p>${countTaskArchived}</p>
  <p>${countIdeaArchived}</p>
      <p>${countRandomArchived}</p>
  </div>
 
</li>`;
  totalNote.insertAdjacentHTML("afterend", liTag);
}
//
totalTabel();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    category = categoryDropDown.value,
    description = descTag.value.trim();

  if (title || description || category) {
    let currentDate = new Date(),
      month = currentDate.getMonth() + 1,
      day = currentDate.getDate(),
      year = currentDate.getFullYear();

    let noteInfo = {
      title,
      category,
      description,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
      // noteDefoult.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
      // noteDefoult[updateId] = noteInfo;
    }
    // if (!isUpdate) {
    //   noteDefoult.push(noteInfo);
    // } else {
    //   isUpdate = false;
    //   noteDefoult[updateId] = noteInfo;
    // }

    showNotes();
    closeIcon.click();
  }
});
