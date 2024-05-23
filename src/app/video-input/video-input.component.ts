import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
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
  autoplayVal:boolean = true;
  userAnswerSrc:boolean;
  mediaType:string;
  @Output()
  onStartRecord:EventEmitter<any> = new EventEmitter();
  @Output()
  onRecordReady:EventEmitter<any> = new EventEmitter();
  @Output()
  onStreamReady:EventEmitter<any> = new EventEmitter();
  @Output()
  currentTime:EventEmitter<number> = new EventEmitter();
  showControl:boolean;
  resolution:{height:number |undefined,width:number|undefined};
  constructor(@Inject(PLATFORM_ID) private _platform: Object,private _cdr: ChangeDetectorRef) {
  }
  ngOnInit(){
  }
  async onStart() {
    // Check if the code is running in the browser and if mediaDevices is supported
    if (isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      try {
        // Determine if the device is in portrait orientation
        const isPortrait = screen.availHeight > screen.availWidth;

        //Get video stream with specified parameters, including resolution constraints
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: { ideal: 16 , max: 60},
            facingMode: { ideal: "user" },
            width: { ideal:1280, max: 3840 },
            height: {ideal:720, max: 2160 }
          },
          audio: false
        });

        // Extract width and height from the video stream settings
        const { width, height } = this.videoStream.getVideoTracks()[0].getSettings();
        this.resolution = {
          width: isPortrait ? height : width,
          height: isPortrait ? width : height
        };

        // Get audio stream with specified parameters
        this.audioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: {
            sampleSize: 16,
            sampleRate: 44100,
            echoCancellation: true,
            noiseSuppression: true
          }
        });

        // Emit an event indicating that the streams are ready
        this.onStreamReady.emit();

        // Get the video element reference
        const _video = this.video.nativeElement;

        // Combine video and audio streams into a single MediaStream
        this.stream = new MediaStream([
          ...this.videoStream.getVideoTracks(),
          ...this.audioStream.getAudioTracks()
        ]);

        // Set the combined stream as the source for the video element and start playing
        _video.srcObject = this.stream;
        _video.play();
      } catch (error) {
        // Log any errors that occur during media device access
        console.error('Error accessing media devices:', error);
      }
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
    this.video.nativeElement.removeEventListener("timeupdate",this.currTimeFn.bind(this));
  }
  startRecord(){

    this.mutedOnRecord = true;
    this.hideControls = true;
    this.recordedChunks = [];
    let options: any = {
      mimeType: 'video/webm;codecs=vp9',
      audioBitsPerSecond: 64000,
      videoBitsPerSecond: 128000
    };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
      this.mediaType = 'webm';
    } catch (err) {
      try {
        // Fallback for iOS
        this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/mp4' });
        this.mediaType = 'mp4';
      }catch (err2) {
        // If fallback doesn't work either. Log / process errors.
        console.error({err});
        console.error({err2})
      }
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
          this.showControl = true;
          this._cdr.detectChanges();
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
          type: 'video/'+this.mediaType
        });

        this.onRecordReady.emit({blob:videoBuffer,type:this.mediaType,resolution: this.resolution});
        this.downloadVideoUrl = window.URL.createObjectURL(videoBuffer);
        this.video.nativeElement.src = this.downloadVideoUrl;
        this.video.nativeElement.srcObject = null;
        this.video.nativeElement.play();
      };
    } catch (error) {
      alert(error);
    }
  }
  setSrc(src:string){
    this.userAnswerSrc = true;
    this.autoplayVal = false;
    this.video.nativeElement.src = src;
    this.currentTime.emit(0);
    this.video.nativeElement.addEventListener("timeupdate", this.currTimeFn.bind(this))
  }

  currTimeFn(){
    this.currentTime.emit(this.video.nativeElement.currentTime)
  }
}
