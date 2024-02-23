import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { FormResponse } from '../model/form.model';
import { AdminService } from '../admin.service';

type FormState = {
    forms: FormResponse|null;
    isLoading: boolean;
    error:string|null;
  };
  
  const initialState: FormState = {
    forms: null,
    isLoading: false,
    error: null
  };
  
  export const FormsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, adminService = inject(AdminService)) => ({
        loadForms(offset:number, size:number){
          patchState(store, { isLoading: true});
          adminService.loadForms(offset,size).subscribe({next:(formResp:FormResponse)=>{ 
            patchState(store, { forms:formResp, isLoading: false });
          },error:error=>{
            patchState(store, { forms:null, isLoading: false , error:error.message});
          }})
        }
      }))
  );