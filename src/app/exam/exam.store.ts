import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'; 
import { inject } from '@angular/core';
import { Form } from '../admin/model/form.model';
import { ExamService } from './exam.service';
import { User } from '../shared/model/user.model';
import { QuestionData } from '../shared/model/question-data.model';

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
            converInfoAndFinishToQuestion(formResp);
            patchState(store, { form:formResp, isLoading: false });
          },error:error=>{
            patchState(store, { form:null, isLoading: false , error:error.message});
          }})
        },
        getQuestion(link:string){
            if(!store.isLoading() && store.form()){
                const userStr:string = localStorage.getItem('user')!;
                const user:User = JSON.parse(userStr);
                const exam = user.exam!.find(e=>e.id===link);
                const currentQuestionIndex = store.currentQuestionIndex()+1;
                exam!.lastQuestion = currentQuestionIndex;
                localStorage.setItem('user',JSON.stringify(user));                
                patchState(store, { currentQuestionIndex});
            }            
        },
        setLastQuestion(index:number){
            patchState(store, { currentQuestionIndex: index});
        },
        setLoading(isLoading:boolean){
            patchState(store, {isLoading});
        }

      }))
  );
  const converInfoAndFinishToQuestion = (formResp:Form)=>{
    formResp.questions = formResp.questions!.map((q: QuestionData) => {
      q.systemGroup = formResp.systemGroup;
      return q;
    });
    formResp.questions!.unshift({
        sec:-1,
        questionType:'info',
        img:'https://primefaces.org/cdn/primeng/images/usercard.png',
        title:formResp.systemGroup.startTitle,
        subheader:formResp.systemGroup.startSubTitle,
        text:formResp.intro.text,
        systemGroup: formResp.systemGroup
    })
    formResp.questions!.push({
        sec:-1,
        noControl:true,
        questionType:'info',
        img:'https://t3.ftcdn.net/jpg/02/91/52/22/360_F_291522205_XkrmS421FjSGTMRdTrqFZPxDY19VxpmL.jpg',
        title:formResp.systemGroup.finishTitle,
        subheader:formResp.systemGroup.finishSubTitle,
        text:formResp.finish.text,
        systemGroup: formResp.systemGroup
    })
  }