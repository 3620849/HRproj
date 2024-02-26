import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { Form } from '../admin/model/form.model';
import { ExamService } from './exam.service';

type ExamState = {
    form: Form|null;
    isLoading: boolean;
    currentQuestionIndex:number;
    error:string|null;
  };
  
  const initialState: ExamState = {
    form: null,
    isLoading: false,
    currentQuestionIndex: 0,
    error: null
  };
  
  export const ExamStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, examSrv = inject(ExamService)) => ({
        loadForm(link:string){
          patchState(store, { isLoading: true});
          examSrv.loadForm(link).subscribe({next:(formResp:Form)=>{
            converInfoAndFinisToQuestion(formResp);
            patchState(store, { form:formResp, isLoading: false });
          },error:error=>{
            patchState(store, { form:null, isLoading: false , error:error.message});
          }})
        },
        getQuestion(){
            if(!store.isLoading() && store.form()){
                patchState(store, { currentQuestionIndex: store.currentQuestionIndex()+1});
            }            
        }

      }))
  );
  const converInfoAndFinisToQuestion = (formResp:Form)=>{
    formResp.questions!.unshift({
        sec:-1,questionType:'info',img:'https://primefaces.org/cdn/primeng/images/usercard.png',title:"Welcome", subheader:'at online assesment', text:formResp.intro.text
    })
    formResp.questions!.push({
        sec:-1,noControl:true,questionType:'info',img:'https://t3.ftcdn.net/jpg/02/91/52/22/360_F_291522205_XkrmS421FjSGTMRdTrqFZPxDY19VxpmL.jpg',title:"Finish", subheader:'well done', text:formResp.intro.text
    })
  }