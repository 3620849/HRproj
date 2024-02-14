import { AnswerData } from "../../shared/model/answer-data.model";

export class Form {
    id: string;
    link:string;
    title: string;
    logo:string;
    reviews: number;
    company: string;
    inventoryStatus: string;
}
export class FormResponse{
    list:Form[];
    total:number;
    page:number;
}
export class Answer {
    id: string;
      name: string;
      date: number;
      status: string;
      review: number;
}
export class AnswesListResponse{
    list:Answer[];
    total:number;
    page:number;
}

export class TesteeAnswersResponse {
    id:string;
    answers: AnswerData[];
}