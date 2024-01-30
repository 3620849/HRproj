import { Component, computed, effect } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule,ButtonModule, FormsModule,CheckboxModule,InputTextModule,PasswordModule,DividerModule],
  //providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  pass:string;
  mail:string;

  constructor(private loginSrv:LoginService,private router: Router,private route: ActivatedRoute,private messageService: MessageService){
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
    this.loginSrv.login(this.mail,this.pass)
    .subscribe({
      next:()=>{
        this.router.navigateByUrl('/admin');
      },
      error:err=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error});
      }
    });
  }
}
