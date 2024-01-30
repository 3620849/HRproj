import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { filter } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastModule,CommonModule,RouterOutlet,TopMenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  barType:'common'|'exam' = 'common';
  constructor(private router: Router){
    router.events.pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((event:any) => 
           {
              if(event.url.includes('exam')){
                this.barType = 'exam'
              } else {
                this.barType = 'common';
              }
           });
    }
}

