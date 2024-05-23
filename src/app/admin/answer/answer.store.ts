import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { AnsweredUserResponse, FormResponse } from '../model/form.model';
import { AdminService } from '../admin.service';
import { AnswerData, AnswerReviewResponse } from '../../shared/model/answer-data.model';

type AnswerRewievState = {
    answerReview: AnswerReviewResponse|null;
    isLoading: boolean;
    error:string|null;
  };
  
  const initialState: AnswerRewievState = {
    answerReview: null,
    isLoading: false,
    error: null
  };
  
  export const AnswerRewievStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, adminService = inject(AdminService)) => ({
        loadPublicAnswer(publicLink){
            adminService.loadPublicTesteeAnswers(publicLink).subscribe({next:(formResp:AnswerReviewResponse)=>{ 
              patchState(store, { answerReview:formResp, isLoading: false });
            },error:error=>{
              patchState(store, { answerReview:null, isLoading: false , error:error.message});
            }})
        },
        loadAnswersList(examId:string, userId:string){
          patchState(store, { isLoading: true});
           
            adminService.loadTesteeAnswers(examId,userId).subscribe({next:(formResp:AnswerReviewResponse)=>{ 
              patchState(store, { answerReview:formResp, isLoading: false });
            },error:error=>{
              patchState(store, { answerReview:null, isLoading: false , error:error.message});
            }})
          }
      }))
  );