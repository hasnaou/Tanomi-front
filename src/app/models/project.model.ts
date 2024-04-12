import { Task } from "./task.model";

export class Project {
    projectId?:number;
    title?:String;
    description?:String;
    tasks?: Task[];
}
