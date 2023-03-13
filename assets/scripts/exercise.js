const createTaskItem = (taskKey) => {
  const { taskText, index } = taskKey;
  const li = document.createElement("li");
  li.className = "task_element";
  const taskContainer = document.createElement("div");
  taskContainer.className = "task_div";
  const h2 = document.createElement("h2");
  h2.className = "h2";
  h2.textContent = taskText;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "task_button";
  taskContainer.appendChild(h2);
  taskContainer.appendChild(deleteBtn);
  li.appendChild(taskContainer);
  deleteBtn.addEventListener("click", (deletebuttons) => {
    deletebuttons.target.parentElement.remove();
  });
  return li;
};
const taskList = document.getElementById("task_list");

const addTaskHandler = () => {
  const taskInput = document.getElementById("title");

  const data = {
    taskText: taskInput.value,
  };

  const taskArray = [];
  taskArray.push(data);
  taskArray.forEach((element) => {
    const taskelement = createTaskItem(element);
    console.dir(taskelement);
    taskList.appendChild(taskelement);
  });
};

const addTaskBtn = document.getElementById("button");
addTaskBtn.addEventListener("click", addTaskHandler);

