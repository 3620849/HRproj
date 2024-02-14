import { Injectable } from '@angular/core';
import { QuestionData } from '../shared/model/question-data.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  questions:QuestionData[] = [
    {id:'xxx',sec:-1,type:'info',img:'https://primefaces.org/cdn/primeng/images/usercard.png',title:"Welcome", subheader:'at online assesment', text:'Congradulation, you were selected as candidate to this role.'+ 
    'After you press button below will begin demonstration of our app wit example question you can stop' + 
    'it in any time and return back in any time later.'},
    {id:'xd1b3c', startOnShow:false, type:'videoBlitz' ,text:'Please press start button when you will be ready', options:[
      {id:"a1a",text:'What is your name?', sec:5},
      {id:"b2a",text:'What color is best?', sec:10},
      {id:"c3a",text:'How many people was in the team?', sec:5},
      {id:"d4a",text:'What is your strength?', sec:5}],total:6,oder:1},
      {id:'a1b3c',sec:15, startOnShow:false,type:'video',text:'Please brifly describe your experience on previouse place of work.',total:6,oder:2},          
      {id:'x1b4x',type:'inputText', startOnShow:false, text:'Please write your name and second name', options:['Name','Second Name'],total:6,oder:1},
      {id:'a4b1c',sec:30, startOnShow:true, type:'checkboxSingle', text:'What is the capital of Great britain?', options:['London','Kiev','Tel-Aviv'],total:6,oder:3},
      {id:'d1b5c',sec:30, startOnShow:true, type:'checkboxMultiple', text:'Select right answers', options:['Steal money is good','I never steal money','Better not steal money'],total:6,oder:4},
    {id:'fdgfg',noControl:true, sec:-1,type:'info', title:"Finish", subheader:'well done', img:'https://t3.ftcdn.net/jpg/02/91/52/22/360_F_291522205_XkrmS421FjSGTMRdTrqFZPxDY19VxpmL.jpg',text:'We will contact you after reivew.'},
  ]

  lastQuestion:number = -1;
  lastSubQuestion:number = -1;
  constructor() { }

  getQuestion(userId:string){
    //TODO add server side
    ++this.lastQuestion;
    if(this.questions.length-1 < this.lastQuestion){
      this.lastQuestion=0;
    }
    return this.questions[this.lastQuestion];
  }
  sendAnswer(data:QuestionData){
    //TODO send data to server
    console.log(data);    
  }
  getSubquestions(id:string){
    //TODO add server side
    ++this.lastSubQuestion;
    let optionsArr = this.questions.find(el=> el.id === id)?.options;
    if(optionsArr){
      if(optionsArr.length-1 < this.lastSubQuestion){
        return null;
      }
      return optionsArr[0];
    }
  }
}
