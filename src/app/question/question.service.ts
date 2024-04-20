import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class QuestionService {
    questionInteracted: WritableSignal<boolean> = signal(false);
    answeredQuestion (val:boolean) {
      this.questionInteracted.update(()=>val);
    }
}