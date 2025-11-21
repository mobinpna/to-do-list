import {
  newProject,
  removeProject,
  addTask,
  removeTask,
  toggleTask,
} from "./logic.js";
import { projects } from "./storage.js";
function domInit(projects) {
  render(projects);
}

function render(projects, currentProj = projects[0]) {
  const taskListContainer = document.querySelector(".task-list");
  const projectListContainer = document.querySelector(".project-list");
  renderTasks(currentProj, currentProj.taskList, taskListContainer, "task");
  renderProjects(projects, projectListContainer, "project");
}

function renderTasks(project, list, container) {
  clearTaskSection();
  newTaskListener(project);
  if (list.length == 0) return;

  list.forEach((task) => {
    const newDiv = divCreator("task");
    //checkbox
    const input = Object.assign(document.createElement("input"), {
      type: "checkbox",
      id: task.id,
      checked: task.done,
    });
    const label = Object.assign(document.createElement("label"), {
      htmlFor: task.id,
      textContent: task.title,
    });

    newDiv.appendChild(input);
    newDiv.appendChild(label);

    newDiv.dataset.id = task.id;
    newDiv.dataset.index = task.getTaskIndex();
    newDiv.dataset.projectIndex = project.getIndex();
    newDiv.dataset.done = list[task.getTaskIndex()].done;

    const delBtn = Object.assign(document.createElement("button"), {
      className: "del-btn",
      id: task.id,
    });
    newDiv.appendChild(delBtn);

    container.appendChild(newDiv);

    taskListeners(newDiv, input, delBtn, task, list);
  });
}

function taskListeners(div, checkBox, delBtn, task, list) {
  checkBox.addEventListener("click", (e) => {
    toggleTask(task, list);
    render(projects, projects[task.getProjIndex()]);
  });

  delBtn.addEventListener("click", (e) => {
    let pi = Number(div.dataset.projectIndex);
    let ti = Number(div.dataset.index);
    removeTask(pi, ti);
    render(projects, projects[task.getProjIndex()]);
  });
}

function clearTaskSection() {
  document.querySelectorAll(".task").forEach((e) => e.remove());
}

function clearProjectSection() {
  document.querySelectorAll(".project").forEach((e) => e.remove());
}

function renderProjects(projects, container) {
  clearProjectSection();
  newProjListener(container);
  const newProjInput = document.querySelector(".new-proj");
  projects.forEach((proj) => {
    const title = divCreator("project");
    const index = projects.findIndex((project) => project === proj);
    title.dataset.index = index;
    title.textContent = proj.title;
    
    const delBtn = Object.assign(document.createElement("button"), {
      className: "del-btn",
    });
    if (index !== 0) {
      title.appendChild(delBtn);
    }

    container.insertBefore(title, newProjInput);

    projectListeners(title, delBtn);
  });
}
function projectListeners(div, delBtn) {
  div.addEventListener("click", (e) => {
    render(projects, projects[div.dataset.index]);
  });

  delBtn.addEventListener("click", (e) => {
    let pi = Number(div.dataset.index);
    removeProject(pi);
    render(projects, projects[div.dataset.index]);
  });
}

function divCreator(classes = "") {
  const div = document.createElement("div");
  div.className = classes;
  return div;
}

function newTaskListener(proj) {
  const field = document.querySelector("#task-input");
  const btn = document.querySelector("#add-task-button");
  btn.onclick = function () {
    addTask(field.value, proj.title);
    field.value = "";
    render(projects, proj);
  };
}

function newProjListener(container) {
  const field = document.querySelector("#proj-input");
  const btn = document.querySelector("#add-proj-button");
  btn.onclick = function () {
    newProject(field.value);
    field.value = "";
    renderProjects(projects, container);
  };
}

export { domInit };
