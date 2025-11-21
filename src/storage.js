import { newProject, Project, Task } from "./logic.js";

let projects;

function checkStorage() {
  let raw = window.localStorage.getItem("projects");
  let storedProjects = null;

  try {
    storedProjects = JSON.parse(raw);
  } catch (e) {
    console.warn("Invalid JSON in localStorage:", e);
  }

  // Validate: must be an array
  const isValidArray = Array.isArray(storedProjects);

  if (isValidArray) {
    projects = reviveObject(storedProjects);
  } else {
    console.warn("Invalid or missing stored projects, resetting...");
    projects = [];
    newProject("Inbox");
  }
}

function reviveObject(strObj) {

  try {
    
    let revivedObj = strObj.map((proj) => {
      let revivedProj = Project(proj.title, proj.description);
      for (let index = 0; index < proj.taskList.length; index++) {
        let task = proj.taskList[index];
  
        revivedProj.taskList.push(
          Task(
            task.title,
            task.project,
            task.description,
            task.priority,
            task.tag,
            task.dueDate
          )
        );
      }
      return revivedProj;
    });
    return revivedObj;
  } catch (e) {
      projects = [];
      newProject("Inbox");
  }

}

function updateStorage() {
  window.localStorage.setItem("projects", JSON.stringify(projects));
}

export { checkStorage, projects, updateStorage };


