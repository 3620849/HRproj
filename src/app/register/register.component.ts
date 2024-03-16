import { Component, computed, effect, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserStore } from '../shared/store/user.store';
import { getState } from '@ngrx/signals';
import { Registration } from '../shared/model/registration.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,ToastModule,ButtonModule, FormsModule,CheckboxModule,InputTextModule,PasswordModule,DividerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form:FormGroup;
  readonly userStore = inject(UserStore);

  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private messageService: MessageService){
    this.form = new FormGroup({
      login: this.fb.control("" ,[Validators.required]),
      name: this.fb.control("" ,[Validators.required]),
      password: this.fb.control("" ,[Validators.required]),
      confirmPassword: this.fb.control("" ,[Validators.required]),
      photo: this.fb.control("" ,[Validators.required]),

    },{
      validators: this.matchValidator('password', 'confirmPassword')
    });
    effect(()=>{
      const state = getState(this.userStore);
      let user = state.user;
      if(user){
        if(route.snapshot.url.join('').includes('register')){
          router.navigateByUrl('/admin');
          this.messageService.add({ severity: 'success', summary: 'Success', detail:'You have been registered'});
        }
      } 
      if(state.error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail:state.error});
      }
    })
  }
  register(){
    const user = this.form.getRawValue();
    const r = new Registration();
    r.login = user.login;
    r.password = user.password;
    r.photo = user.photo;
    r.name = user.name;
    this.userStore.registerUser(r);
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }

}
