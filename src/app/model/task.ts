export interface Task {
    creator:string;
    createdTime:Date;
    content:string;
    assignTo:string[];
    done:Boolean;
    history:History[];
}

export interface History {
    edit_time:Date;
    edit_person:string;
    content?:string;
    assignTo?: string;
    status?:string;
}