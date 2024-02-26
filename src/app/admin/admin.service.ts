import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs'; 
import { AnswesListResponse, Form, FormResponse } from './model/form.model';
import { AnswerData, AnswerReviewResponse } from '../shared/model/answer-data.model';
import { QuestionData } from '../shared/model/question-data.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  answers = {
    total:4,
    page:0,
    list:[
    {
      id: 'sdfsfd',
      name: 'Petro Bamper',
      date: 1706976183301,
      status: 'NEW',
      review: 0
    },
    {
      id: 's1dee',
      name: 'John Wick',
      date: 1706676486301,
      status: 'CHECKED',
      review: 4
    },
    {
      id: 'ff2ss',
      name: 'German Miller',
      date: 1706476186301,
      status: 'BAD',
      review: 2
    }
  ]}

  testeeAnswers: AnswerReviewResponse = {
    list: [
      {
        answer: { "id": "xd1b3c", "answerOptions": [{ text: "Tel-Aviv" }] },
        question: { id: 'a4b1c', sec: 30, startOnShow: true, questionType: 'checkboxSingle', text: 'What is the capital of Great britain?', options: [{text:'London'}, {text:'kiev'}, {text:'tlv'}], total: 6, oder: 3 },
      },
      {
        answer: { "id": "xd1b3c", "answerOptions": [{ text: 'I never steal money' }, { text: 'Better not steal money' }] },
        question: { id: 'd1b5c', sec: 15, startOnShow: true, questionType: 'checkboxMultiple', text: 'Select right answers', options: [{text:'Steal money is good'}, {text:'I never steal money'},  {text:'money'}], total: 6, oder: 4 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ text: 'Dima' }, { text: 'Shanin' }] },
        question: { id: 'x1b4x', questionType: 'inputText', startOnShow: false, text: 'Please write your name and second name', options: [{text:'Name'}, {text:'Second Name'}], total: 6, oder: 1 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ video: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
        question: { id: 'a1b3c', sec: 15, startOnShow: false, questionType: 'video', text: 'Please brifly describe your experience on previouse place of work.', total: 6, oder: 2 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ video: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
        question: {
          id: 'xd1b3c', startOnShow: false, questionType: 'videoBlitz', text: 'Please press start button when you will be ready', options: [
            { id: "a1a", text: 'What is your name?', sec: 5 },
            { id: "b2a", text: 'What color is best?', sec: 10 },
            { id: "c3a", text: 'How many people was in the team?', sec: 5 },
            { id: "d4a", text: 'What is your strength?', sec: 5 }], total: 6, oder: 1
        }
      }
    ]
  }

    constructor(private http:HttpClient) { }

    loadAnswersList(id: string, offset: number, size: number):Observable<AnswesListResponse> {
      return this.http.get<AnswesListResponse>(environment.api+"/answers/"+id+"?offset="+offset+"&size="+size)
    }

    loadForms(offset:number,size:number):Observable<FormResponse>{
     return this.http.get<FormResponse>(environment.api+"/forms?offset="+offset+"&size="+size)
    }

    loadTesteeAnswers(id: string):Observable<AnswerReviewResponse> {
      return this.http.get<AnswerReviewResponse>(environment.api+"/answer/"+id)
    }
    loadForm(id: string) {
      return this.http.get<Form>(environment.api+"/form/"+id)
    }
    saveForm(form:Form):Observable<any>{
      return this.http.post(environment.api+"/form",form);
    }
}