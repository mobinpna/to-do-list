import { projects } from "./logic.js";

function domInit(projects) {
  render(projects);
}

function render(projects, currentProj = projects[0]) {
  const taskListContainer = document.querySelector(".task-list");
  const projectListContainer = document.querySelector(".project-list");
  clearTaskSection();
  clearProjectSection();
  renderTasks(currentProj, currentProj.taskList, taskListContainer, "task");
  renderTasks(currentProj, currentProj.doneTaskList, taskListContainer, "task");
  renderProjects(projects, projectListContainer, "project");
}

function renderTasks(project, list, container) {
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

    newDiv.dataset.index = task.getProjIndex();
    newDiv.dataset.projectIndex = project.getIndex();
    newDiv.dataset.done = list[task.getTaskIndex()].done;
    container.appendChild(newDiv);

    taskListeners(newDiv, task);
  });
}

function taskListeners(div, task) {
  div.addEventListener("click", (e) => {
    task.toggleDone();
    e.target.dataset.done = e.target.dataset.done ? "false" : "true";
    render(projects, projects[task.getProjIndex()]);
  });
}

function clearTaskSection() {
  const taskListContainer = document.querySelector(".task-list");
  taskListContainer.textContent = "";
}

function clearProjectSection() {
  const projListContainer = document.querySelector(".project-list");
  projListContainer.textContent = "";
}

function renderProjects(projects, container) {
  projects.forEach((proj) => {
    const title = divCreator("project");
    const index = projects.findIndex((project) => project === proj);
    title.dataset.index = index;
    title.textContent = proj.title;
    container.appendChild(title);
    projectListeners(title);
  });
}
function projectListeners(div) {
  div.addEventListener("click", (e) => {
    render(projects, projects[div.dataset.index]);
  });
}

function divCreator(classes = "") {
  const div = document.createElement("div");
  div.className = classes;
  return div;
}

export { domInit };
