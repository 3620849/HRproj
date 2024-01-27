import { QuestionType } from "./question-type.model";

export interface QuestionData {
    id?:string;
    sec?:number;
    startOnShow?:boolean;
    type: QuestionType;
    text?: string,
    options?: any[],
    total?:number;
    oder?:number;
    noControl?:boolean;
    title?:string;
    subheader?:string;
    img?:string;
}