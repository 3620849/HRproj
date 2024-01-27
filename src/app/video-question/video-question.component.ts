import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VideoInputComponent } from '../video-input/video-input.component';
import { AnswerData } from '../shared/model/answer-data.model';
import { QuestionData } from '../shared/model/question-data.model';
declare var MediaRecorder: any;
@Component({
  selector: 'app-video-answer',
  standalone: true,
  imports: [CommonModule,ButtonModule,VideoInputComponent],
  templateUrl: './video-question.component.html',
  styleUrl: './video-question.component.scss'
})
export class VideoQuestionComponent   {
  @Input()
  data:QuestionData;
  hideControls:boolean;
  @ViewChild(VideoInputComponent)
  videoInputComponent:VideoInputComponent;
  @Output()
  userChoise:EventEmitter<AnswerData> = new EventEmitter();
  @Output()
  videoStarted:EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  startRecord(){
    this.videoStarted.emit();
    this.hideControls = true;
    this.videoInputComponent.startRecord();
    setTimeout(()=>{
      this.videoInputComponent.stopVideoRecording();
    }, this.data.sec! * 1000)
  }
  setUserChoise($event:Blob){
    let answer:AnswerData = {
      id: this.data.id,
      text: this.data.text,
      answerOptions:[{video:$event}]
    }
    this.userChoise.emit(answer);
  } 
}
