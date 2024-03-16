import { Component, computed, effect, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserStore } from '../shared/store/user.store';
import { getState } from '@ngrx/signals';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ToastModule,ButtonModule, FormsModule,CheckboxModule,InputTextModule,PasswordModule,DividerModule],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  pass:string = "123";
  mail:string = "a@gmail.com";
  readonly store = inject(UserStore);

  constructor(private router: Router,private route: ActivatedRoute,private messageService: MessageService){
    effect(()=>{
      const state = getState(this.store);
      let user = state.user;
      if(user){
        if(route.snapshot.url.join('').includes('login')){
          router.navigateByUrl('/admin');
        }
      } 
      if(state.error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:state.error});
      }
    })
  }
  login(){
    this.store.loadUser(this.mail,this.pass);
  }
}
