import { Task } from "./task";

export interface TodoList {
    createTime: Date;
    creator: string;
    sharewith?:string[];
    title:string;
    tasks?:Task[];
    deadline?:Date;
    tags:string[];
    tasksnum:Number;
    taskdone:Number;
    _id?:string;
    

}