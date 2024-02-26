import { Injectable } from '@angular/core';
import { QuestionData } from '../shared/model/question-data.model';
import { HttpClient } from '@angular/common/http';
import { Form } from '../admin/model/form.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }
  
  sendAnswer(data:QuestionData){
    //TODO send data to server
    console.log(data);    
  }
  loadForm(link: string) {
    return this.http.get<Form>(environment.api+"/exam?link="+link)
  }
}
