import { Task } from "./task.model";

export class Project {
    id?:number;
    title?:String;
    description?:String;
    tasks?: Task[];
}
