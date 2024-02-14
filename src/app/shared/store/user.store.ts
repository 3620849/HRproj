import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../model/user.model';
import { inject } from '@angular/core';
import { LoginService } from '../../login/login.service';

type UserState = {
    user: User|null;
    isLoading: boolean;
    error:string|null;
  };
  
  const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null
  };
  
  export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, loginService = inject(LoginService)) => ({
        async loadUser(email:string,pass:string): Promise<void> {
          patchState(store, { isLoading: true ,user:null,error:null});
          loginService.login(email,pass).subscribe({next:(user:User)=>{
            localStorage.setItem('user', JSON.stringify(user));
            patchState(store, { user, isLoading: false,error:null });
          },error:error=>{
            localStorage.removeItem('user');
            patchState(store, { user:null, isLoading: false , error:error.message});
          }})
        },
        logout(){
            localStorage.removeItem('user');
            patchState(store, { user:null });
        },
        setUser(user:User){
            patchState(store, { user, isLoading: false , error:null});
        }
      }))
  );