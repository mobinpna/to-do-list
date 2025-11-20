import { isBefore } from "date-fns";

const projectProto = {
  pushTask(task) {
    this.taskList.push(task);
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

const projects = [];
const inbox = Project("Inbox");
projects.push(inbox);

const taskProto = {
  toggleDone() {
    this.done = !this.done;
  },

  isOverDue(dueDate) {
    this.overDue = isBefore(new Date(dueDate), new Date());
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

  toDo.title = title;
  toDo.id = Math.floor(Date.now() + Math.random());
  toDo.done = false;
  if (description) toDo.description = description;
  if (priority) toDo.priority = priority;
  if (tag) toDo.tag = pushUnique(tag);
  if (dueDate) toDo.dueDate = dueDate;
  toDo.isOverDue(dueDate);
  toDo.project = project;

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
  projTitle = "inbox",
  projDescription = "",
  taskTitle,
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
  if (!isNew(projTitle)) {
    const index = projects.findIndex((item) => item.title === projTitle);
    projects[index].taskList.push(task);
  } else {
    const project = Project(projTitle, projDescription);
    newProject(project);
    project.taskList.push(task);
  }
}

function isNew(title) {
  let result = true;
  projects.forEach((proj) => {
    if (proj.title === title) result = false;
  });
  return result;
}

function newProject(project) {
  projects.push(project);
}

export { addTask, projects };
