export interface AnswerData {
    id?:string;
    text?:string;
    answerOptions: AnswerOptions[];
    questions?:any;
}
export interface AnswerOptions {
    video?:any;
    label?:string;
    text?:string;
}