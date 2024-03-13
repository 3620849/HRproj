import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { VideoQuestionComponent } from '../video-question/video-question.component';
import { InputTextQuestionComponent } from '../input-text-question/input-text-question.component';
import { CheckBoxQuestionComponent } from '../check-box-question/check-box-question.component';
import { QuestionData } from '../shared/model/question-data.model';
import { ReactiveFormsModule} from '@angular/forms';
import { AnswerData } from '../shared/model/answer-data.model';
import { TopMenuBarService } from '../top-menu-bar/top-menu-bar.service';
import { VideoBlitzComponent } from '../video-blitz/video-blitz.component';
import { CardModule } from 'primeng/card';
import { IntroComponent } from '../intro/intro.component';
@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextQuestionComponent,
    CheckBoxQuestionComponent,
    VideoQuestionComponent,
    CommonModule,
    PanelModule,
    ButtonModule,
    BadgeModule,
    NgSwitch, 
    NgSwitchCase,
    NgSwitchDefault,
    VideoBlitzComponent,
    CardModule,
    IntroComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input()
  data:QuestionData
  @Output()
  getQuestion:EventEmitter<any> = new EventEmitter();
  @Output()
  submitAnswer:EventEmitter<any> = new EventEmitter(); 
  constructor(private barService:TopMenuBarService){
  }
  ngOnChanges(changes: SimpleChanges): void {
    const d:any = changes['data'];
    if(d && d['currentValue']){
      let time = this.data.sec;
       
      if(this.data.questionType === 'videoBlitz'){
        time = this.data.options?.reduce((acc:number,curr:any)=>{
          return acc+curr.sec+5
        },0)
      }
      this.barService.setTimer(time);
      if(this.data.startOnShow){
        this.barService.startTimer();
      }
    }
  }
  userAnswer:AnswerData|null;
  setUserChoise($event:AnswerData){
    //$event.questionType = this.data.questionType;
    console.log('in question ', $event);
    
    this.userAnswer = $event;
  }
  submit(){
    this.submitAnswer.emit(this.userAnswer);
    this.userAnswer =  null;
  }
  ngOnInit(){
    //this.getQuestion.emit(true)
  }
  started(){
    this.barService.startTimer();
  }
  get questionData():QuestionData|undefined{
    return this.data;
  }
}
