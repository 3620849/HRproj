import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, effect } from '@angular/core';
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
import { QuestionService } from './question.service';
import { TimerService } from '../shared/services/timer.service';
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
export class QuestionComponent implements OnInit {
  @Input()
  data:QuestionData
  @Output()
  getQuestion:EventEmitter<any> = new EventEmitter();
  @Output()
  submitAnswer:EventEmitter<any> = new EventEmitter();
  showSubmit:boolean = true;
  timer:number;
  constructor(private barService:TopMenuBarService, public questionService:QuestionService, public timerSrv:TimerService){
    effect(()=>{
     this.showSubmit = questionService.questionInteracted();
     this.timer = timerSrv.currentTime();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const d:any = changes['data'];
    if(d && d['currentValue']){
      const t = this.data.questionType;
      //in this mode timer run after user start recording so timer set inside this components not here
      if(t === 'videoBlitz' || t === 'video' ){       
      }else{
        this.timerSrv.setTime(this.data.sec ? this.data.sec : 0);
        this.timerSrv.startTimer();
      }
    }
  }

  userAnswer:AnswerData|null;
  setUserChoise($event:AnswerData){
    this.userAnswer = $event;
  }
  submit(){
    this.submitAnswer.emit(this.userAnswer);
    this.userAnswer =  null;
  }
  ngOnInit(){
  }
  started(){
   // this.barService.startTimer(); meanwhile delete time on top at all
  }
  get questionData():QuestionData|undefined{
    return this.data;
  }
}
