import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs'; 
import { AnswesListResponse, FormResponse } from './model/form.model';
import { AnswerData, AnswerReviewResponse } from '../shared/model/answer-data.model';
import { QuestionData } from '../shared/model/question-data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    
    forms = {
      total:4,
      page:0,
      list:[{
        id: '1fgdfg',
        link:'https://69f2-46-117-191-114.ngrok-free.app/#/exam/abcdefg123',
        title: 'Postman',
        logo:'https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2019/10/fedex-2-850x311.png?ezimgfmt=rs:345x131/rscb12/ngcb12/notWebP',
        reviews:15,
        company: 'FEDEX',
        inventoryStatus: 'ACTIVE',
    },{
      id: '1fgdfg',
      link:'https://69f2-46-117-191-114.ngrok-free.app/#/exam/abcdefg123',
      title: 'Driver',
      logo:'https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2019/10/fedex-2-850x311.png?ezimgfmt=rs:345x131/rscb12/ngcb12/notWebP',
      reviews:135,
      company: 'FEDEX',
      inventoryStatus: 'ACTIVE',
    },{
        id: '100gf1',
        title: 'Janitor',
        logo:'https://static.vecteezy.com/system/resources/thumbnails/022/339/377/small/construction-building-company-logo-design-vector.jpg',
        link:'https://69f2-46-117-191-114.ngrok-free.app/#/exam/abcdefg123',
        reviews:4,
        company: 'Lorem',
        inventoryStatus: 'SUSPENDED'
    },{
      id: '100gf1',
      title: 'Catering',
      logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOZrgMOVrB8XLMATiYyRUUNve-wh42hWzU1GY7iIHqdHtnzxBdRCZO70UqVq-8jRJc6gA&usqp=CAU',
      link:'https://69f2-46-117-191-114.ngrok-free.app/#/exam/abcdefg123',
      reviews:4,
      company: 'LOT',
      inventoryStatus: 'DONE'
    }]
  };
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
        question: { id: 'a4b1c', sec: 30, startOnShow: true, type: 'checkboxSingle', text: 'What is the capital of Great britain?', options: ['London', 'Kiev', 'Tel-Aviv'], total: 6, oder: 3 },
      },
      {
        answer: { "id": "xd1b3c", "answerOptions": [{ text: 'I never steal money' }, { text: 'Better not steal money' }] },
        question: { id: 'd1b5c', sec: 15, startOnShow: true, type: 'checkboxMultiple', text: 'Select right answers', options: ['Steal money is good', 'I never steal money', 'Better not steal money'], total: 6, oder: 4 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ text: 'Dima' }, { text: 'Shanin' }] },
        question: { id: 'x1b4x', type: 'inputText', startOnShow: false, text: 'Please write your name and second name', options: ['Name', 'Second Name'], total: 6, oder: 1 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ video: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
        question: { id: 'a1b3c', sec: 15, startOnShow: false, type: 'video', text: 'Please brifly describe your experience on previouse place of work.', total: 6, oder: 2 },
      },
      {
        answer: { "id": "x1b4x", "answerOptions": [{ video: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
        question: {
          id: 'xd1b3c', startOnShow: false, type: 'videoBlitz', text: 'Please press start button when you will be ready', options: [
            { id: "a1a", text: 'What is your name?', sec: 5 },
            { id: "b2a", text: 'What color is best?', sec: 10 },
            { id: "c3a", text: 'How many people was in the team?', sec: 5 },
            { id: "d4a", text: 'What is your strength?', sec: 5 }], total: 6, oder: 1
        }
      }
    ]
  }

    constructor() { }

    loadAnswersList(id: string, ofset: number, size: number):Observable<AnswesListResponse> {
      let s = new Subject<AnswesListResponse>();
      setTimeout(()=>{
        s.next( this.answers)
      },500)
       return s;
    }

    loadForms(ofset:number,size:number):Observable<FormResponse>{
      let s = new Subject<FormResponse>();
      setTimeout(()=>{
        s.next( this.forms)
      },500)
       return s;
    }

    loadTesteeAnswers(id: string):Observable<AnswerReviewResponse> {
      let s = new Subject<AnswerReviewResponse>();
      setTimeout(()=>{
        s.next( this.testeeAnswers)
      },500)
       return s;
    }
}