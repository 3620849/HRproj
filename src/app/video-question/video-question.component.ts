import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VideoInputComponent } from '../video-input/video-input.component';
import { AnswerData } from '../shared/model/answer-data.model';
import { BaseFormComponent } from '../shared/model/base-form.component';
import { QuestionService } from '../question/question.service';
declare var MediaRecorder: any;
@Component({
  selector: 'app-video-answer',
  standalone: true,
  imports: [CommonModule,ButtonModule,VideoInputComponent],
  templateUrl: './video-question.component.html',
  styleUrl: './video-question.component.scss'
})
export class VideoQuestionComponent extends BaseFormComponent implements OnInit{
  ngOnChanges(changes: SimpleChanges): void {
    const a:any = changes['userAnswer'];
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

  hideControls:boolean;
  @ViewChild(VideoInputComponent)
  videoInputComponent:VideoInputComponent;
  @Output()
  videoStarted:EventEmitter<any> = new EventEmitter();
  constructor(public questionService:QuestionService) {
    super();
  }
  ngOnInit(): void {
    setTimeout(()=>{
      if(!this.userAnswer){
        this.videoInputComponent.onStart();
      }
    })
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
    this.questionService.answeredQuestion(true);
    let answer:AnswerData = {
      id: this.data.id,
      text: this.data.text,
      answerOptions:[{video:$event}]
    }
    this.userChoise.emit(answer);
  } 
}
