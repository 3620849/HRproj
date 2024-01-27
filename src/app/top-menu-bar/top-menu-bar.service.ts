import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopMenuBarService {
  timerTitle = computed<string>(()=>{
    let secTotal = this.timerSeconds();
    let min = Math.floor(secTotal/60);
    let sec:any = secTotal%60;
    if(sec<10){
      sec = '0'+sec;
    }
    if(secTotal===-1){
      return '';
    }
    let res = `${min}:${sec}`
    return res;
  })
  private timerSeconds = signal<number>(0);
  private intervalId:any;
  constructor() {
  
 }
 setTimer(seconds:number|undefined){
  if(this.intervalId){
    clearInterval(this.intervalId);
  }
  if(!seconds){
    seconds = 0
  }
  this.timerSeconds.set(seconds);
 }
 getTimerValue():number{
  return this.timerSeconds();
 }

 startTimer(){
  this.intervalId = setInterval (()=>{
    if(this.timerSeconds()>0){
      this.timerSeconds.update(last=>this.timerSeconds()-1)
    } else {
      clearInterval(this.intervalId);
    }
  },1000)
 }
}
