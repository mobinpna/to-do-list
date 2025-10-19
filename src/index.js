import "./style.css";

const projects = [];

function Project(title, description = ""){
    const proj = Object.create(projectProto);
    
    proj.title = title;
    proj.description = description;
    proj.taskList=[];
    
    return proj;
}

const projectProto =  {

    addTask(task) {
        this.taskList.push(task);
    },

}

const inbox = Project("Inbox");

function Task (title, description = "", dueDate = null, priority = 0, tag = 0, note = 0) {
    const toDo = Object.create(taskProto);

    toDo.title= title;
    toDo.done = false;
    toDo.description = description;
    toDo.dueDate = dueDate;
    toDo.priority = priority;
    toDo.tag = tag;
    toDo.note = note;

    return toDo;
}

const taskProto = {

    toggleDone() {
        this.done = !this.done;
    },

}


function newTask(task, project = inbox){
    project.addTask(task);
}

newTask(Task("wash ass"));

console.log(inbox)