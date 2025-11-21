import { isBefore } from "date-fns";
import { updateStorage, projects } from "./storage.js";

const projectProto = {
  newTask(task) {
    this.taskList.unshift(task);
  },
  getIndex() {
    const projIndex = projects.findIndex((proj) => proj === this);
    return projIndex;
  },
};

function Project(title, description = "") {
  const proj = Object.create(projectProto);

  proj.title = title;
  proj.description = description;
  proj.taskList = [];
  return proj;
}

const taskProto = {
  toggleDone() {
    this.done = !this.done;
  },

  isOverDue(dueDate) {
    if (dueDate) {
      this.overDue = isBefore(new Date(dueDate), new Date());
    }
  },

  getTaskIndex() {
    let index;
    let project;
    projects.forEach((proj) => {
      if (proj.title === this.project) project = proj;
    });

    for (let i = 0; i < project.taskList.length; i++) {
      const element = project.taskList[i];
      if (element == this) index = i;
    }

    return index;
  },

  getProjIndex() {
    for (let index = 0; index < projects.length; index++) {
      const proj = projects[index];
      if (proj.title == this.project) return index;
    }
  },

  getTaskId() {
    return this.id;
  },
};

function Task(
  title,
  project,
  description = "",
  priority = 0,
  tag = null,
  dueDate = null
) {
  const toDo = Object.create(taskProto);

  toDo.done = false;
  toDo.id = Math.floor(Date.now() + Math.random());
  toDo.title = title;
  toDo.project = project;
  if (description) toDo.description = description;
  if (priority) toDo.priority = priority;
  if (tag) toDo.tag = pushUnique(tag);
  if (dueDate) toDo.dueDate = dueDate;
  toDo.isOverDue(dueDate);

  return toDo;
}

const tags = [];
function pushUnique(newTag) {
  for (let i = 0; i < tags.length; i++) {
    const element = tags[i];
    if (element == newTag) {
      return newTag;
    }
  }
  tags.push(newTag);
  return newTag;
}

function addTask(
  taskTitle,
  projTitle = "Inbox",
  projDescription = "",
  taskDescription = "",
  priority = 0,
  tag = null,
  dueDate = null
) {
  const task = Task(
    taskTitle,
    projTitle,
    taskDescription,
    priority,
    tag,
    dueDate
  );
  if (isNew(projTitle)) {
    const project = Project(projTitle, projDescription);
    project.newTask(task);
    newProject(project);
  } else {
    const index = projects.findIndex((item) => item.title === projTitle);
    projects[index].newTask(task);
  }
  updateStorage();
}

function removeTask(projIndex, taskIndex){ 
  projects[projIndex].taskList.splice(taskIndex,1);
  updateStorage();
}

function toggleTask(task, list) {
  task.toggleDone();
  list.sort((a, b) => Number(a.done) - Number(b.done));
  updateStorage();
}

function isNew(title) {
  let result = true;
  projects.forEach((proj) => {
    if (proj.title === title) result = false;
  });
  return result;
}

function newProject(title) {
  projects.push(Project(title));
  updateStorage();
}

function removeProject(projIndex){
  projects.splice(projIndex, 1);
  updateStorage();
}


export { Project, Task};
export { newProject, removeProject, addTask, removeTask, toggleTask};
