import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestionData } from '../shared/model/question-data.model';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup,ReactiveFormsModule} from '@angular/forms';
import { QuestionType } from '../shared/model/question-type.model';
import { AnswerData } from '../shared/model/answer-data.model';
import { InputTextModule } from 'primeng/inputtext';
import { BaseFormComponent } from '../shared/model/base-form.component';
@Component({
  selector: 'app-input-text-question',
  standalone: true,
  imports: [CommonModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './input-text-question.component.html',
  styleUrl: './input-text-question.component.scss'
})
export class InputTextQuestionComponent extends BaseFormComponent  implements OnChanges{
  constructor(private fb: FormBuilder) {
    super(); 
    this.form = new FormGroup({
      myOptions: this.fb.array([])
    })
    this.form.valueChanges.subscribe(chan=>{
      const userAnswersOp:any = [];
      chan.myOptions.forEach((el:string, index:number) => {
        if(this.data.options && this.data.options.length>0){
          const answer:any = {};
          answer.label =this.data.options[index];
          answer.text = el;
          userAnswersOp.push(answer);
        }
      });
     const res: AnswerData = {
        id:this.data.id,
        text:this.data.text,
        answerOptions:  userAnswersOp
     }

      this.userChoise.emit(res);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    const d:any = changes['data'];
    const a:any = changes['userAnswer'];
    if(d && d['currentValue']){
      const data = d['currentValue'];
      if( data.options && data.options.length > 0){  
        this.buildForm();
      }      
    }
    if(a && this.data){
      this.setAnswers();
    }
  }

  buildForm(){
    this.data?.options?.forEach((el:string, i:number) => {
      const control = this.fb.control('');
      this.optionss.push(control);
    });
  }
  get optionss() {
    const res =  this.form.get('myOptions') as FormArray; 
    return res;
  } 
  getControlName(type:QuestionType, index:number){
    const single:QuestionType = 'checkboxSingle';
    const isSingle = type === single
    if(isSingle){
      return '0';
    }
    return ''+index;
  }
  override setAnswers(): void {
    if(this.userAnswer){
      this.form.disable();
      this.userAnswer.answerOptions?.forEach((el,index) => {
        this.optionss.at(index).patchValue(el.text)
      })
    }
  }
}