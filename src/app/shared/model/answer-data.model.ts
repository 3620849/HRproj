import { QuestionData, Option } from "./question-data.model";
import { QuestionType } from "./question-type.model";

export interface AnswerData {
    id?:string;
    userId?:string;
    examId?:string;
    text?:string;
    questionType?: QuestionType;
    answerOptions: AnswerOptions[];
    questions?:Option[]; //questions for videoblitz
}
export interface AnswerOptions {
    video?:any;
    videoLink?:any;
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