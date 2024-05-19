import { SystemGroup } from "../../admin/model/form.model";
import { QuestionType } from "./question-type.model";

export interface QuestionData {
    userId?:string;
    id?:string;
    sec?:number;
    startOnShow?:boolean;
    questionType: QuestionType;
    text?: string,
    options?: Option[],
    total?:number;
    oder?:number;
    noControl?:boolean;
    title?:string;
    subheader?:string;
    img?:string;
    systemGroup: SystemGroup;
    shareable?: boolean;
}
export interface Option {
    id?:string,
    text:string,
    sec?:number
}