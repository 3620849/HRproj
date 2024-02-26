import { Component, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { IntroComponent } from '../intro/intro.component';
import { QuestionComponent } from "../question/question.component";
import { CommonModule } from '@angular/common';
import { ExamService } from './exam.service';
import { TopMenuBarService } from '../top-menu-bar/top-menu-bar.service';
import { QuestionData } from '../shared/model/question-data.model';
import { ExamStore } from './exam.store';
import { getState } from '@ngrx/signals';

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
     private loginSrv: LoginService,
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
    this.barService.setTimer(-1);
    if(this.link){
      this.examStore.loadForm(this.link);
    }   
  }

  loadQuestion(){
    this.examStore.getQuestion();    
  }
  submitAnswer($event?:any){
    this.examSrv.sendAnswer($event)
    this.loadQuestion()
  }
}
