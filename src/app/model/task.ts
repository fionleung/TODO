export interface Task {
    creator:String;
    createdTime:Date;
    content:String;
    assignTo:String[];
    done:Boolean;
    history:History[];
}

export interface History {
    edit_time:Date;
    edit_person:String;
    content?:String;
    assignTo?: String;
    status?:String;
}