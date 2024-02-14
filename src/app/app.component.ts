import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { filter } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserStore } from './shared/store/user.store';
import { User } from './shared/model/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastModule,CommonModule,RouterOutlet,TopMenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  barType:'common'|'exam' = 'common';
  readonly store = inject(UserStore);
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
  ngOnInit(): void {
   let userStr = localStorage.getItem('user');
   if(userStr) {
    const userVal:User = JSON.parse(userStr);
    if(userVal){
      this.store.setUser(userVal);
    }
   }
  }
}

