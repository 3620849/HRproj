import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { AnswesListResponse, FormResponse } from '../model/form.model';
import { AdminService } from '../admin.service';

type AnswerListState = {
    answers: AnswesListResponse|null;
    isLoading: boolean;
    error:string|null;
  };
  
  const initialState: AnswerListState = {
    answers: null,
    isLoading: false,
    error: null
  };
  
  export const AnswerListStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, adminService = inject(AdminService)) => ({
        loadAnswersList(id:string,offset:number, size:number){
          patchState(store, { isLoading: true});
          adminService.loadAnswersList(id,offset,size).subscribe({next:(formResp:AnswesListResponse)=>{ 
            patchState(store, { answers:formResp, isLoading: false });
          },error:error=>{
            patchState(store, { answers:null, isLoading: false , error:error.message});
          }})
        }
      }))
  );