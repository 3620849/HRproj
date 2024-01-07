import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { IntroComponent } from '../intro/intro.component';
import { QuestionComponent } from "../question/question.component";
import { CommonModule } from '@angular/common';
import { AnswerComponent } from "../answer/answer.component";

@Component({
    selector: 'app-exam',
    standalone: true,
    templateUrl: './exam.component.html',
    styleUrl: './exam.component.scss',
    imports: [CommonModule, IntroComponent, QuestionComponent, AnswerComponent]
})
export class ExamComponent {
  showIntro= true;
  constructor(private route: ActivatedRoute, private loginSrv: LoginService) {}
  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('id');
    if(token){
      this.loginSrv.testeeLogin(token);
    }    
  }
  startDemo(){
    this.showIntro = false;
  }
}
