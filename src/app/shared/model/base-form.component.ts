import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { QuestionData } from "./question-data.model";
import { AnswerData } from "./answer-data.model";
import { FormGroup } from "@angular/forms";

@Directive()
export abstract class BaseFormComponent{
    @Input()
    data:QuestionData;
    @Output()
    userChoise:EventEmitter<AnswerData> = new EventEmitter();
    form:FormGroup;
    @Input()
    userAnswer:AnswerData|null;
    abstract setAnswers():void;
  
}