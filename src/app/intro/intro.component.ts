import { Component, EventEmitter, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CardModule,ButtonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  @Output()
  startDemo = new EventEmitter<boolean>();

  tryDemo(){
    this.startDemo.emit(true);
  }

}
