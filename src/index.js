import "./style.css";
import "./dueDate.js";
import { isBefore, isThisHour } from "date-fns";
import { is } from "date-fns/locale";


const projectProto =  {
    
    pushTask(task) {
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
        toggleList(this);
    },

    isOverDue (dueDate) {
        this.overDue = isBefore(new Date(dueDate), new Date());
    }
    
}

function Task (title, project, description = "", priority = 0, tag = null, dueDate = null) {
    const toDo = Object.create(taskProto);
    
    toDo.project = project;
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

function addTask(projTitle = "inbox", projDescription = "",taskTitle, taskDescription = "",priority = 0, tag = null, dueDate = null){
    const task = Task(taskTitle, projTitle, taskDescription, priority, tag, dueDate)
    if(!isNew(projTitle)){
        const index =projects.findIndex(item => item.title === projTitle);
        projects[index].taskList.push(task)
    }else{
        const project = Project(projTitle, projDescription);
        projects.push(project);
        project.taskList.push(task);
    }
}

function isNew(title){
    let result = true;
    projects.forEach( (proj) => {
        if(proj.title===title)result = false;
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

addTask("Inbox", "", "shave","",0,"hygene", "2025-10-22")
addTask("hiii", "", "trime","",0,"hygene", "2025-10-22")

projects[0].taskList[0].toggleDone()

console.log(projects)