import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-top-menu-bar',
  standalone: true,
  imports: [CommonModule,RouterModule,AvatarGroupModule,ButtonModule,ToolbarModule,AvatarModule],
  templateUrl: './top-menu-bar.component.html',
  styleUrl: './top-menu-bar.component.scss'
})
export class TopMenuBarComponent {
  @Input() barType:'common'|'exam';
  @Input() timer: string;
  user:Signal<any>;
  constructor(private loginSrv:LoginService,private route: Router ){
    this.user = computed( () => {
      return loginSrv.user();
    })
  }
  login(){
    if(this.user()){
      this.loginSrv.logout();
      this.route.navigateByUrl('/home');
    }else{
      this.route.navigateByUrl('/login');
    }
  }
}
