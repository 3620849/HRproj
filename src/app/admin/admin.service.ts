import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs'; 
import { AnsweredUserResponse, Form, FormResponse } from './model/form.model';
import { AnswerData, AnswerReviewResponse } from '../shared/model/answer-data.model'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    constructor(private http:HttpClient) { }

    loadAnswersList(id: string, offset: number, size: number):Observable<AnsweredUserResponse> {
      return this.http.get<AnsweredUserResponse>(environment.api+"/answers/"+id+"?offset="+offset+"&size="+size)
    }

    loadForms(offset:number,size:number):Observable<FormResponse>{
     return this.http.get<FormResponse>(environment.api+"/forms?offset="+offset+"&size="+size)
    }
    loadPublicTesteeAnswers(publicLink: string):Observable<AnswerReviewResponse> {
      return this.http.get<AnswerReviewResponse>(environment.api+"/answer/public/"+publicLink)
    }
    loadTesteeAnswers(examId: string,userId: string):Observable<AnswerReviewResponse> {
      return this.http.get<AnswerReviewResponse>(environment.api+"/answer/"+examId+"?userId="+userId)
    }
    loadForm(id: string) {
      return this.http.get<Form>(environment.api+"/form/"+id)
    }
    saveForm(form:Form):Observable<any>{
      return this.http.post(environment.api+"/form",form);
    }
    updateForm(form:Form):Observable<any>{
      return this.http.put(environment.api+"/form",form);
    }
    deleteForm(id: string) {
      return this.http.delete(environment.api+"/form/"+id)
    }
}