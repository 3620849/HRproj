import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VideoInputComponent } from '../video-input/video-input.component';
import { AnswerData } from '../shared/model/answer-data.model';
import { Option, QuestionData } from '../shared/model/question-data.model';
import { BaseFormComponent } from '../shared/model/base-form.component';
import { QuestionService } from '../question/question.service';
import { TimerService } from '../shared/services/timer.service';
declare var MediaRecorder: any;
@Component({
  selector: 'app-video-blitz',
  standalone: true,
  imports: [CommonModule,ButtonModule,VideoInputComponent],
  templateUrl: './video-blitz.component.html',
  styleUrl: './video-blitz.component.scss'
})
export class VideoBlitzComponent  extends BaseFormComponent implements OnInit{  
  hideControls:boolean;
  @ViewChild(VideoInputComponent)
  videoInputComponent:VideoInputComponent;
  stopTimer:number;
  @Output()
  videoStarted:EventEmitter<any> = new EventEmitter(); 
  questionText:WritableSignal<string> = signal<string>('');
  startCountdown:boolean;
  counterInterval:any;
  blitzTimer:WritableSignal<number> = signal<number>(0);
  intervalId:any;
  TIMEOUT_BETWEEN_QUESTIONS=1000;
  constructor(public questionService:QuestionService, public timerSrv:TimerService) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const d:any = changes['data'];
    const a:any = changes['userAnswer'];
    if(d && d['currentValue']){
      const data = d['currentValue'];
      if(this.data.questionType === 'videoBlitz'){
        this.stopTimer = this.data.options!.reduce((acc:number,curr:Option)=>{
          return acc+curr.sec!+this.TIMEOUT_BETWEEN_QUESTIONS/1000
        },0)*1000;
      }
    }
    if(a){
      this.hideControls = true;
      this.setAnswers();
    }
  }
  override setAnswers(): void {  
    setTimeout(()=>{ 
      this.videoInputComponent.setSrc(this.userAnswer!.answerOptions[0].videoLink);
    }); 
  }
  ngOnInit(): void {
    setTimeout(()=>{
      if(!this.userAnswer){
        this.videoInputComponent.onStart();
      }
    }) 
  }

  startRecord(){
    this.hideControls = true;
    this.startBlitz(0);
    this.videoStarted.emit();
    this.videoInputComponent.startRecord();
    setTimeout(()=>{
      this.videoInputComponent.stopVideoRecording();
    }, this.stopTimer);
  }
  setUserChoise($event:Blob){
    this.questionService.answeredQuestion(true);
    let answer:AnswerData = {
      id: this.data.id,
      text: this.data.text,
      questions:this.data.options,
      answerOptions:[{video:$event}]
    }
    this.userChoise.emit(answer);
  } 
  startBlitz(question:number) {
    const options = this.data.options;
    if(question === options?.length!){
      this.startCountdown = false;
      return;
    } 
    this.startCountdown = true;
    this.questionText.set(this.data.options![question].text); 
    //this.startCountoDownTimer(question);
    this.timerSrv.setTime(this.data.options![question].sec!);
    this.timerSrv.startTimer();
    setTimeout(()=>{
      this.startBlitz(++question);
    },this.data.options![question].sec!*1000+this.TIMEOUT_BETWEEN_QUESTIONS)
  }
  setCurrentVideoTime($event:number){
    if(this.userAnswer){
      const index = this.getIndexByTime($event);
      if(this.data && this.data.options){
        this.questionText.set(this.data.options[index]!.text);
      }      
    }
  }
  getIndexByTime(time:number):number{
    let index = 0;
    const timeSpace = this.TIMEOUT_BETWEEN_QUESTIONS/1000;
    if(time< timeSpace+1){
      return index;
    }
    const arr = this.data.options!;
    for(let i = 1, timePassed = timeSpace+arr[0].sec!;i<arr!.length;++i){
      timePassed += timeSpace+arr[0].sec!;
      if(time<timePassed){
        index = i;
        break;
      }
    }
    return index;
  }
}
