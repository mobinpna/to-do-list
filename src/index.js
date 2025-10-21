import "./style.css";
import "./dueDate.js";
import { isBefore } from "date-fns";


const projectProto =  {
    
    addTask(task) {
        this.taskList.push(task);
    },
    
}

function Project(title, description = ""){
    const proj = Object.create(projectProto);
    
    proj.title = title;
    proj.description = description;
    proj.taskList=[];
    proj.doneTaskList=[];
    
    return proj;
}


const projects = [];
const inbox = Project("Inbox");
projects.push(inbox);


const taskProto = {
    
    toggleDone() {
        this.done = !this.done;
    },

    isOverDue (dueDate) {
        this.overDue = isBefore(new Date(dueDate), new Date());
    }
    
}

function Task (title, description = "", priority = 0, tag = null, dueDate = null) {
    const toDo = Object.create(taskProto);
    
    toDo.project;
    toDo.title = title;
    toDo.done = false;
    if(description)toDo.description = description;
    if(priority)toDo.priority = priority;
    if(tag)toDo.tag = pushUnique(tag);
    if(dueDate)toDo.dueDate = dueDate;
    toDo.isOverDue(dueDate);
    
    return toDo;
}


const tags = [];
function pushUnique (newTag){
    for (let i = 0; i < tags.length; i++) {
        const element = tags[i];
        if(element == newTag){
            return newTag;
        }
    }
    tags.push(newTag);
    return newTag;
}

function newTask(task, project = inbox){
    if(isNew(project)){
        newProject(project);
    }
    project.addTask(task);
    task.project = project.title;
}

function isNew(newProject){
    let result = true;
    projects.forEach( (proj) => {
        if(proj===newProject)result = false;
    })
    return result
}

function newProject(project) {
    projects.push(project)
}

function toggleList(task) {
    if(task.done){
        projects.forEach(proj => {
            if(proj.title == task.project){
                proj.taskList.forEach(instance => {
                    if(instance === task){
                        proj.taskList = proj.taskList.filter(item => item !== instance);
                        proj.doneTaskList.push(instance)
                    }
                })
            }
        })
    }
    if(task.done === false){
        projects.forEach(proj => {
            if(proj.title == task.project){
                proj.taskList.forEach(instance => {
                    if(instance === task){
                        proj.taskList = proj.doneTaskList.filter(item => item !== instance);
                        proj.taskList.push(instance)
                    }
                })
            }
        })
    }
}

newTask(Task("shave","",0,"hygene", "2025-10-22"),Project("hiii"));
newTask(Task("trim","",0,"hygene", "2025-10-22"),Project("hiii"));


// console.log(projects[1].taskList[0].done);
projects[1].taskList[0].toggleDone();
// console.log(projects[1].taskList[0].done);
toggleList(projects[2].taskList[0]);
toggleList(projects[2].taskList[0]);

console.log(projects)



