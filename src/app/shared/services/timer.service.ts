import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class TimerService {
    currentTime:WritableSignal<number> = signal(0);
    intervalId:any;
    setTime(val:number){
        this.currentTime.update(()=>val);
    }



    startTimer(){
        this.intervalId = setInterval(()=>{
            this.currentTime.update(val=>val-1);
            if(this.currentTime()<1){
                clearInterval(this.intervalId);
            }
        },1000)
    }
  
}