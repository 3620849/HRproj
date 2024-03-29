import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { QuestionData } from '../shared/model/question-data.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  @Output()
  submitEvent = new EventEmitter();
  @Input()
  data:QuestionData|undefined;
  ngOnInit(){
  }
  submit(){
    this.submitEvent.emit();
  }
}
