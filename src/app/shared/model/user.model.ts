export class User {
    id?:string;
    name?:string;
    token?: string;
    role?: string;
    photo?:string;
    exam?: UserExam[];
}

export class UserExam{
    id:string;
    lastQuestion:number;
}