import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderService {
    currentLoad:WritableSignal<number> = signal(0);
    setLoad(val:number){
        this.currentLoad.update(()=>val);
    }  
}