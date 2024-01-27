import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TopMenuBarService } from '../top-menu-bar/top-menu-bar.service';
declare var MediaRecorder: any;

@Component({
  selector: 'app-video-input',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './video-input.component.html',
  styleUrl: './video-input.component.scss'
})
export class VideoInputComponent implements OnInit, OnDestroy {
  @ViewChild('video', {static: true}) video: ElementRef<HTMLVideoElement>;
  mediaRecorder:any;
  recordedChunks:any = [];
  stream: MediaStream;
  isRecording:boolean;
  downloadVideoUrl:string;
  hideControls:boolean;
  mutedOnRecord:boolean = true;
  videoStream:MediaStream;
  audioStream:MediaStream;
  @Output()
  onStartRecord:EventEmitter<any> = new EventEmitter();
  @Output()
  onRecordReady:EventEmitter<any> = new EventEmitter();
  @Output()
  onStreamReady:EventEmitter<any> = new EventEmitter();
  constructor(@Inject(PLATFORM_ID) private _platform: Object) {
  }
  ngOnInit(){
    this.onStart();
  }
  async onStart(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {

      this.videoStream = await navigator.mediaDevices.getUserMedia({video: true, audio:false});
      this.audioStream = await navigator.mediaDevices.getUserMedia({video: false, audio:
        { sampleSize: 16, sampleRate: 44100, echoCancellation: true, noiseSuppression: true }});
      this.onStreamReady.emit();
        const _video = this.video.nativeElement;
        this.stream = new MediaStream([...this.videoStream.getVideoTracks(), ...this.audioStream.getAudioTracks()])
        _video.srcObject = this.stream;
        _video.play(); 
    }
  } 
  onStop() {
    this.video.nativeElement.pause();
    (this.video.nativeElement.srcObject as MediaStream)?.getTracks()?.forEach(t=>t.stop());
    this.video.nativeElement.srcObject = null;
  }

  ngOnDestroy() {
    this.stream?.getTracks()?.forEach(t=>t.stop());
    this.videoStream?.getTracks()?.forEach(t=>t.stop());
    this.audioStream?.getTracks()?.forEach(t=>t.stop());
    this.video.nativeElement.src='';
    this.video.nativeElement.srcObject = null;
  }
  startRecord(){
    this.mutedOnRecord = true;
    this.hideControls = true;
    this.recordedChunks = [];
    let options: any = {
        mimeType: 'video/webm'
    };
    try {
        this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
        console.log(err);
    }
    this.mediaRecorder.start();
    this.isRecording = !this.isRecording;
    this.onDataAvailableVideoEvent();
    this.registerVideoRecordingEvent();
     
  }
  stopVideoRecording() {
    this.video.nativeElement.pause();
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
    this.mutedOnRecord = false;

}
  onDataAvailableVideoEvent() {
    try {
        this.mediaRecorder.ondataavailable = (event: any) => {
            if (event.data && event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };
    } catch (error) {
        alert(error);
    }
}
registerVideoRecordingEvent() {
  try {
      this.mediaRecorder.onstop = (event: Event) => {
          const videoBuffer = new Blob(this.recordedChunks, {
              type: 'video/webm'
          });
          this.onRecordReady.emit(videoBuffer);
          this.downloadVideoUrl = window.URL.createObjectURL(videoBuffer);
          this.video.nativeElement.src = this.downloadVideoUrl;
          this.video.nativeElement.srcObject = null;          
          this.video.nativeElement.play();
      };
  } catch (error) {
      alert(error);
  }
}
  
}
