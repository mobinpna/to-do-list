import "./reset.css";
import "./style.css";
import { domInit } from "./dom.js";
import { checkStorage, projects } from "./storage.js";

checkStorage();
domInit(projects);
