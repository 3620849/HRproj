import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { Form } from '../model/form.model';
import { AdminService } from '../admin.service';

type FormState = {
    form: Form|null;
    isLoading: boolean;
    error:string|null;
  };
  
  const initialState: FormState = {
    form: null,
    isLoading: false,
    error: null
  };
  
  export const CurrentFormStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, adminService = inject(AdminService)) => ({
        loadForm(id:string){
          patchState(store, { isLoading: true});
          adminService.loadForm(id).subscribe({next:(formResp:Form)=>{ 
            patchState(store, { form:formResp, isLoading: false });
          },error:error=>{
            patchState(store, { form:null, isLoading: false , error:error.message});
          }})
        }
      }))
  );