export interface Task {
    creator:String;
    createdTime:Date;
    content:String;
    assignTo:String[];
    status:String;
    history:History[];
}

interface History {
    edit_time:Date;
    edit_person:String;
    content?:String;
    assignTo?: String;
    status?:String;
}