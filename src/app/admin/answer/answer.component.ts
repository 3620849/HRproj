import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { IntroComponent } from '../../intro/intro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CheckBoxQuestionComponent } from '../../check-box-question/check-box-question.component';
import { InputTextQuestionComponent } from '../../input-text-question/input-text-question.component';
import { VideoBlitzComponent } from '../../video-blitz/video-blitz.component';
import { VideoQuestionComponent } from '../../video-question/video-question.component';
import { QuestionData } from '../../shared/model/question-data.model';
import { AnswerData } from '../../shared/model/answer-data.model';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [ReactiveFormsModule,
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
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent {
  //TODO move this to admin service
  answers:{answer:AnswerData, question:QuestionData}[] = [
    {
      answer: {"id": "xd1b3c","answerOptions":[{text:"Tel-Aviv"}]},
      question:{id:'a4b1c',sec:30, startOnShow:true, type:'checkboxSingle', text:'What is the capital of Great britain?', options:['London','Kiev','Tel-Aviv'],total:6,oder:3},
    },
    {
      answer: {"id": "xd1b3c","answerOptions":[{text:'I never steal money'},{text:'Better not steal money'}]},
      question:{id:'d1b5c',sec:15, startOnShow:true, type:'checkboxMultiple', text:'Select right answers', options:['Steal money is good','I never steal money','Better not steal money'],total:6,oder:4},
    },
    {
      answer: {"id": "x1b4x","answerOptions":[{text:'Dima'},{text:'Shanin'}]},
      question:{id:'x1b4x',type:'inputText', startOnShow:false, text:'Please write your name and second name', options:['Name','Second Name'],total:6,oder:1},
    },
    {
      answer: {"id": "x1b4x","answerOptions":[{video:'https://www.w3schools.com/html/mov_bbb.mp4'}]},
      question:{id:'a1b3c',sec:15, startOnShow:false,type:'video',text:'Please brifly describe your experience on previouse place of work.',total:6,oder:2},
    },
    {
      answer: {"id": "x1b4x","answerOptions":[{video:'https://www.w3schools.com/html/mov_bbb.mp4'}]},
      question:{id:'xd1b3c', startOnShow:false, type:'videoBlitz' ,text:'Please press start button when you will be ready', options:[
        {id:"a1a",text:'What is your name?', sec:5},
        {id:"b2a",text:'What color is best?', sec:10},
        {id:"c3a",text:'How many people was in the team?', sec:5},
        {id:"d4a",text:'What is your strength?', sec:5}],total:6,oder:1}
    }
  ]
}
