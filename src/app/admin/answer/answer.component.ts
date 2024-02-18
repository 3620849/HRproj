import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IntroComponent } from '../../intro/intro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CheckBoxQuestionComponent } from '../../check-box-question/check-box-question.component';
import { InputTextQuestionComponent } from '../../input-text-question/input-text-question.component';
import { VideoBlitzComponent } from '../../video-blitz/video-blitz.component';
import { VideoQuestionComponent } from '../../video-question/video-question.component';
import { QuestionData } from '../../shared/model/question-data.model';
import { AnswerData } from '../../shared/model/answer-data.model';
import { AnswerRewievStore } from './answer.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [ReactiveFormsModule,
    InputTextQuestionComponent,
    CheckBoxQuestionComponent,
    VideoQuestionComponent,
    CommonModule,
    PanelModule,
    ButtonModule,
    BadgeModule,
    NgSwitch, 
    NgSwitchCase,
    NgSwitchDefault,
    VideoBlitzComponent,
    CardModule,
    IntroComponent],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent {
  readonly answerStore = inject(AnswerRewievStore);
  constructor( private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.answerStore.loadAnswersList(id);
    }
  }
}
