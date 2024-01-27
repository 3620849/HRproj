import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, WritableSignal, signal } from '@angular/core';
import { QuestionData } from '../shared/model/question-data.model';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { QuestionType } from '../shared/model/question-type.model';
import { AnswerData } from '../shared/model/answer-data.model';
@Component({
  selector: 'app-check-box-question',
  standalone: true,
  imports: [CommonModule,RadioButtonModule,ReactiveFormsModule],
  templateUrl: './check-box-question.component.html',
  styleUrl: './check-box-question.component.scss'
})
export class CheckBoxQuestionComponent implements OnChanges{
  @Input()
  data:QuestionData;
  form:FormGroup;
  @Output()
  userChoise:EventEmitter<AnswerData> = new EventEmitter();
  
  constructor(private fb: FormBuilder) { 
    this.form = new FormGroup({
      myOptions: this.fb.array([])
    })
    this.form.valueChanges.subscribe(chan=>{
      const userAnswersOp:any = [];
      chan.myOptions.forEach((el:string) => {
        const indexOfAnswer = el.indexOf('userChoise');
        if(indexOfAnswer > -1) {
          const index = el.substring(indexOfAnswer+10,el.length);
          userAnswersOp.push(index);
        }
      })

      userAnswersOp.forEach((answer:number,index:number)=>{
        if(this.data.options && this.data.options.length>0){
          userAnswersOp[index] = this.data.options[answer];
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
    if(d && d['currentValue']){
      const data = d['currentValue'];
      if( data.options && data.options.length > 0){  
        this.buildForm();
      }      
    }
  }

  buildForm(){
    const single:QuestionType = 'checkboxSingle'; 
    if (this.data.type === single) {
      this.optionss.push(this.fb.control(''+0));
    } else {
      this.data?.options?.forEach((el:string, i:number) => {
        const control = this.fb.control(''+i);
        control.setValue(el);
        this.optionss.push(control);
      })
    }
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
}
