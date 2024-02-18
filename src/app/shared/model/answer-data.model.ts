import { QuestionData } from "./question-data.model";

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
export interface AnswerReviewResponse {
    list:AnswerReview[];
}
export interface AnswerReview{
    answer:AnswerData,
    question:QuestionData|undefined
}