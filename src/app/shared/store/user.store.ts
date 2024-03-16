import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../model/user.model';
import { inject } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Registration } from '../model/registration.model';

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
    withMethods((store, loginService = inject(LoginService)) =>{
       async function loadUser(email:string,pass:string): Promise<void> {
        patchState(store, { isLoading: true ,user:null,error:null});
        loginService.login(email,pass).subscribe({next:(user:User)=>{
          localStorage.setItem('user', JSON.stringify(user));
          patchState(store, { user, isLoading: false,error:null });
        },error:error=>{
          localStorage.removeItem('user');
          patchState(store, { user:null, isLoading: false , error:error.error.message});
        }})
      }

      async function registerUser(newUser:Registration): Promise<void> {
        patchState(store, { isLoading: true ,user:null,error:null});
        loginService.registerUser(newUser).subscribe({next:()=>{
          loadUser(newUser.login, newUser.password)
        },error:error=>{
          localStorage.removeItem('user');
          patchState(store, { user:null, isLoading: false , error:error.error.message});
        }})
      }

      return {loadUser, registerUser,
        logout(){
            localStorage.removeItem('user');
            patchState(store, { user:null });
        },
        setUser(user:User){
            patchState(store, { user, isLoading: false , error:null});
        }
      }
    })
  );