import { AnswerData } from "../../shared/model/answer-data.model";
import { QuestionData } from "../../shared/model/question-data.model";
import { Option } from "../../shared/model/question-data.model";

export class Form {
    id: string;
    link:string;
    title: string;
    logo:string;
    reviews?: number;
    company: string;
    status: string;
    intro: Option;
    finish: Option;
    questions?: QuestionData[];
    systemGroup: SystemGroup
}
export class SystemGroup {    
       startTitle: string;
       startSubTitle: string;
       startBtn: string;
       questionHeader: string;
       submit: string;
       finishTitle: string;
       finishSubTitle: string;
}
export class FormResponse{
    list:Form[];
    total:number;
    page:number;
}
export class AnsweredUser {
      id: string;
      name: string;
      date: number;
      status: string;
      review: number;
      userId: string;
      examId: string;
}
export class AnsweredUserResponse{
    list:AnsweredUser[];
    total:number;
    page:number;
}

export class TesteeAnswersResponse {
    id:string;
    answers: AnswerData[];
}