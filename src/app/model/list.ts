import { Task } from "./task";

export interface TodoList {
    createTime: Date;
    creator: String;
    sharewith:String[];
    title:String;
    tasks:Task[];
    deadline?:Date;
}