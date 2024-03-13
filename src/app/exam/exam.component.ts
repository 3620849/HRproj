import { Component, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntroComponent } from '../intro/intro.component';
import { QuestionComponent } from "../question/question.component";
import { CommonModule } from '@angular/common';
import { ExamService } from './exam.service';
import { TopMenuBarService } from '../top-menu-bar/top-menu-bar.service';
import { QuestionData } from '../shared/model/question-data.model';
import { ExamStore } from './exam.store';
import { getState } from '@ngrx/signals';
import { User, UserExam } from '../shared/model/user.model';
import { v4 as uuidv4 } from 'uuid';
import { AnswerData } from '../shared/model/answer-data.model';
@Component({
    selector: 'app-exam',
    standalone: true,
    templateUrl: './exam.component.html',
    styleUrl: './exam.component.scss',
    imports: [CommonModule, IntroComponent, QuestionComponent]
})
export class ExamComponent {
  link:string;
  readonly examStore = inject(ExamStore);
  data:WritableSignal<QuestionData|null>= signal(null);
  constructor(private route: ActivatedRoute,
     private examSrv: ExamService,
     private barService:TopMenuBarService) {
      effect(() => {
        const state = getState(this.examStore);
        const index = state.currentQuestionIndex;
        if( state.form && state.form.questions){
          let q = state.form!.questions![index];
          this.data.set(q);
        }
      },{allowSignalWrites:true})
  }

  ngOnInit(): void {
    this.link = ''+this.route.snapshot.paramMap.get('id');
    this.loadLastUserActions();
    this.barService.setTimer(-1);
    if(this.link){
      this.examStore.loadForm(this.link);
    }   
  }

  loadQuestion(){
    this.examStore.getQuestion(this.link);    
  }
  submitAnswer($event?:AnswerData){    
    const ans = this.formatAnswer($event!);
    this.examStore.setLoading(true);
    this.examSrv.sendAnswer(ans).subscribe(()=>{
      this.examStore.setLoading(false);
      this.loadQuestion()
    })
  }
  formatAnswer($event: AnswerData) {
    //TODO clone and copy blob
   // const answer:AnswerData =  JSON.parse(JSON.stringify($event));
   $event.examId = this.examStore.form()!.id;   
    $event.questionType = this.data()!.questionType;
    if($event.answerOptions){
      $event.answerOptions.map((op:any)=>{
        if(op.label){
          op.label = op.label.text;
        }
        return op;
      })
    }
    return $event;
  }
  loadLastUserActions() {
    const userStr:string|null = localStorage.getItem('user');
    if(!userStr){
      const user:User = {id:uuidv4(), role:'testee',exam:[{id:this.link,lastQuestion:0}]}
      localStorage.setItem('user',JSON.stringify(user));
    }else{
      const user:User = JSON.parse(userStr);
      if(user.exam){
        const exam = user.exam.find(exam=>exam.id===this.link);
        if(exam){
          this.examStore.setLastQuestion(exam.lastQuestion);
        }else{
          user.exam.push({id:this.link,lastQuestion:0})
          localStorage.setItem('user',JSON.stringify(user));
        }
      }else{
        user.exam = [{id:this.link,lastQuestion:0}];
        localStorage.setItem('user',JSON.stringify(user));
      }
    }

  }
}
