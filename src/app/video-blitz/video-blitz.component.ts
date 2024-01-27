import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild, WritableSignal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VideoInputComponent } from '../video-input/video-input.component';
import { AnswerData } from '../shared/model/answer-data.model';
import { QuestionData } from '../shared/model/question-data.model';
declare var MediaRecorder: any;
@Component({
  selector: 'app-video-blitz',
  standalone: true,
  imports: [CommonModule,ButtonModule,VideoInputComponent],
  templateUrl: './video-blitz.component.html',
  styleUrl: './video-blitz.component.scss'
})
export class VideoBlitzComponent {
  @Input()
  data:QuestionData;
  hideControls:boolean;
  @ViewChild(VideoInputComponent)
  videoInputComponent:VideoInputComponent;
  stopTimer:number;
  @Output()
  userChoise:EventEmitter<AnswerData> = new EventEmitter();
  @Output()
  videoStarted:EventEmitter<any> = new EventEmitter(); 
  questionText:WritableSignal<string> = signal<string>('');
  startCountdown:boolean;
  counterInterval:any;
  moveTop:boolean;
  blitzTimer:WritableSignal<number> = signal<number>(0);
  intervalId:any;
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    const d:any = changes['data'];
    if(d && d['currentValue']){
      const data = d['currentValue'];
      if(this.data.type === 'videoBlitz'){
        this.stopTimer = this.data.options?.reduce((acc:number,curr:any)=>{
          return acc+curr.sec+5
        },0)*1000;
      }
    }
  }
  ngOnInit(){
    console.log('init');    
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
    let answer:AnswerData = {
      id: this.data.id,
      text: this.data.text,
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
    this.moveTop = false;  
    this.questionText.set(this.data.options![question].text);
    
    this.startCountoDownTimer(question);
    setTimeout(()=>{
      this.startBlitz(++question);
    },this.data.options![question].sec*1000+5000)
  }
  startCountoDownTimer(question:number){ 
    setTimeout(()=>{ 
      this.moveTop=true;
      this.blitzTimer.set(this.data.options![question].sec);
      this.intervalId = setInterval(()=>{
        if(this.blitzTimer()<1){
          clearInterval(this.intervalId);
        }
        this.blitzTimer.update(val=>val-1);
      },1000)
    },5000)
  }
}
