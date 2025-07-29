document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("textarea");
  const select = document.querySelector(".select-category");
  const addbutton = document.querySelector(".addbtn");
  const selectDisplay = document.querySelector(".selectDisplay"); // Make sure this matches your HTML class

  addbutton.addEventListener("click", () => {
    const taskText = input.value.trim();
    const selectedDay = select.options[select.selectedIndex].text;

    if (!taskText || selectedDay === "Day") {
      alert("Please enter a task and select a day");
      return;
    }

    const dayDivs = document.querySelectorAll(".day");
    let targetDay = null;

    for (let dayDiv of dayDivs) {
      const heading = dayDiv.querySelector("h2");
      if (
        heading &&
        heading.textContent.toLowerCase().trim() === selectedDay.toLowerCase().trim()
      ) {
        targetDay = dayDiv;
        break;
      }
    }

    if (!targetDay) {
      alert("Could not find selected day section.");
      return;
    }

    const taskLine = document.createElement("div");
    taskLine.className = "task-line";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    const taskContent = document.createElement("div");
    taskContent.className = "blank-line";
    taskContent.textContent = taskText;
    taskContent.contentEditable = true;

    taskLine.appendChild(checkbox);
    taskLine.appendChild(taskContent);
    targetDay.appendChild(taskLine);

    input.value = "";
    select.value = "";
  });

  // ✅ Filter logic for selectDisplay
  if (selectDisplay) {
    selectDisplay.addEventListener("change", () => {
      const filterValue = selectDisplay.value;
      const allTasks = document.querySelectorAll(".task-line");

      allTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox");

        if (filterValue === "all") {
          task.style.display = "flex";
        } else if (filterValue === "completed" && checkbox.checked) {
          task.style.display = "flex";
        } else if (filterValue === "uncompleted" && !checkbox.checked) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    });
  }
});
