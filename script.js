const addBox = document.querySelector(".btn_add"),
      taskBox = document.querySelector(".task_box"),
      closeIcon = taskBox.querySelector("header i"),
      addNewNote = taskBox.querySelector("button") 


addBox.addEventListener("click", () => {
  taskBox.classList.add("show")
})

closeIcon.addEventListener("click", () => {
  taskBox.classList.remove("show")
})

addNewNote.addEventListener("click", () => {
  console.log("button")
})