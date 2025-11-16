import "./reset.css";
import "./style.css";
import { addTask, projects } from "./logic.js";
import { domInit } from "./dom.js";

//EOF dom.js
addTask("Inbox", "", "fix car", "", 0, "chore", "2025-10-22");

addTask("TOP", "", "style the page", "", 0, "study", "2025-10-22");
addTask("TOP", "", "bububub", "", 0, "study", "2025-10-22");
projects[0].taskList[0].toggleDone();
domInit(projects);
console.log(projects);
