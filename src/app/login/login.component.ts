import { Component, computed, effect } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule,CheckboxModule,InputTextModule,PasswordModule,DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  pass:string;
  mail:string;

  constructor(private loginSrv:LoginService,private router: Router,private route: ActivatedRoute){
    effect(()=>{
      let user = this.loginSrv.user();
      if(user && user.role === 'admin'){
        if(route.snapshot.url.join('').includes('login')){
          router.navigateByUrl('/admin');
        }
      }
    })
  }
  login(){
    this.loginSrv.login(this.mail,this.pass);
  }
}
