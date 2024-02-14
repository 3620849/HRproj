import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs'; 
import { AnswesListResponse, FormResponse } from './model/form.model';

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

    loadTesteeAnswers(id: string):Observable<AnswesListResponse> {
      let s = new Subject<AnswesListResponse>();
      setTimeout(()=>{
        s.next( this.answers)
      },500)
       return s;
    }
}