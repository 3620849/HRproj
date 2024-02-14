import { Component, Input, Signal, WritableSignal, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { TopMenuBarService } from './top-menu-bar.service';
import { UserStore } from '../shared/store/user.store';
@Component({
  selector: 'app-top-menu-bar',
  standalone: true,
  imports: [CommonModule,RouterModule,AvatarGroupModule,ButtonModule,ToolbarModule,AvatarModule],
  templateUrl: './top-menu-bar.component.html',
  styleUrl: './top-menu-bar.component.scss'
})
export class TopMenuBarComponent {
  @Input() barType:'common'|'exam';
  timer: Signal<string>;
  user:Signal<any>;
  readonly userStore = inject(UserStore);
  constructor(private route: Router, private barService:TopMenuBarService ){
    this.user = this.userStore.user;
    this.timer = barService.timerTitle;
  }
  login(){
    if(this.user()){
      this.userStore.logout();
      this.route.navigateByUrl('/home');
    }else{
      this.route.navigateByUrl('/login');
    }
  }
}
