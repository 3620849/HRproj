import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { IntroComponent } from '../intro/intro.component';
import { QuestionComponent } from "../question/question.component";
import { CommonModule } from '@angular/common';
import { ExamService } from './exam.service';
import { TopMenuBarService } from '../top-menu-bar/top-menu-bar.service';
import { QuestionData } from '../shared/model/question-data.model';

@Component({
    selector: 'app-exam',
    standalone: true,
    templateUrl: './exam.component.html',
    styleUrl: './exam.component.scss',
    imports: [CommonModule, IntroComponent, QuestionComponent]
})
export class ExamComponent {
  token:string;
  data:WritableSignal<QuestionData|null>= signal(null);
  constructor(private route: ActivatedRoute,
     private loginSrv: LoginService,
     private examSrv: ExamService,
     private barService:TopMenuBarService) {
     }
  ngOnInit(): void {
    this.token = ''+this.route.snapshot.paramMap.get('id');
    this.barService.setTimer(-1);
    if(this.token){
    this.loginSrv.testeeLogin(this.token).subscribe((user)=>{
        if(user.error){
          this.data.set({type:'info',text:user.error, noControl:true, img:'https://cdn-icons-png.flaticon.com/512/5741/5741824.png'})
        }else{
          this.loadQuestion();
        }
        
    });
    }    
  }
  loadQuestion(){
    const data = this.examSrv.getQuestion(this.token);
    if(data && data.type === 'info'){
      this.barService.setTimer(data.sec);
    }
    this.data.set(data);    
  }
  submitAnswer($event?:any){
    this.examSrv.sendAnswer($event)
    this.loadQuestion()
  }
}
