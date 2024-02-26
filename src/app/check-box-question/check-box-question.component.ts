import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, WritableSignal, signal } from '@angular/core';
import { Option, QuestionData } from '../shared/model/question-data.model';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { QuestionType } from '../shared/model/question-type.model';
import { AnswerData, AnswerOptions } from '../shared/model/answer-data.model';
import { BaseFormComponent } from '../shared/model/base-form.component';
@Component({
  selector: 'app-check-box-question',
  standalone: true,
  imports: [CommonModule,RadioButtonModule,ReactiveFormsModule],
  templateUrl: './check-box-question.component.html',
  styleUrl: './check-box-question.component.scss'
})
export class CheckBoxQuestionComponent extends BaseFormComponent implements OnChanges{
  
  constructor(private fb: FormBuilder) { 
    super();
    this.form = new FormGroup({
      myOptions: this.fb.array([])
    })
    this.form.valueChanges.subscribe(chan=>{
      const userAnswersOp:AnswerOptions[] = [];
      const userAnswersIndexes:number[] = [];
      chan.myOptions.forEach((el:string) => {
        const indexOfAnswer = el.indexOf('userChoise');
        if(indexOfAnswer > -1) {
          const index = el.substring(indexOfAnswer+10,el.length);
          userAnswersIndexes.push(+index);
        }
      })

      userAnswersIndexes.forEach((answer:number,index:number)=>{
        if(this.data.options && this.data.options.length>0){
          userAnswersOp[index] = {text:this.data.options[answer].text};
        }        
      })
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
  setAnswers(){
    if(this.userAnswer){
      this.form.disable();
      const userAnswerOtions:any = {}
      this.userAnswer.answerOptions.forEach(el=>{if(el.text){userAnswerOtions[el.text]=true}});
      this.data.options?.forEach((el,index) => {
        if(userAnswerOtions[el.text]){
          if(this.data.questionType==='checkboxSingle'){
            this.optionss.patchValue(['userChoise'+index]);
          }
          if(this.data.questionType==='checkboxMultiple'){
            this.optionss.at(index).patchValue(['userChoise'+index])
          }
        }
      });   
    }
  }

  buildForm(){
    const single:QuestionType = 'checkboxSingle'; 
    if (this.data.questionType === single) {
      this.optionss.push(this.fb.control(''+0));
    } else {
      this.data?.options?.forEach((el:Option, i:number) => {
        const control = this.fb.control(''+i);
        control.setValue(el.text);
        this.optionss.push(control);
      })
    }
  }
  get optionss():FormArray {
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
}
