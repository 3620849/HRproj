import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '../admin/model/form.model';
import { environment } from '../../environments/environment';
import { Observable, delay, of, switchMap } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AnswerData } from '../shared/model/answer-data.model';
import { Media } from '../shared/model/media.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  sendAnswer(data:AnswerData):Observable<any>{
    const userStr:string = localStorage.getItem('user')!;
    const user:User = JSON.parse(userStr);
    data.userId = user.id;
    if(data.questionType === 'video' ||data.questionType === 'videoBlitz'){
      const option = data.answerOptions!.find(option => option.video);
      const blob = option!.video
      const file = new File([blob], "myvideo.webm",{type:"video/webm"});
      const formData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();
      headers = headers.delete('Content-Type');
     
      return this.http.post<any>(environment.api+"/upload",formData, {headers, reportProgress: true }).pipe(
        switchMap(media=>{
            data.answerOptions = [{videoLink:media.url}] 
            return this.http.post(environment.api+"/exam",data)
          })
      );
    }else{
      return this.http.post(environment.api+"/exam",data)
    }
  }
  loadForm(link: string) {
    return this.http.get<Form>(environment.api+"/exam?link="+link)
  }

}
