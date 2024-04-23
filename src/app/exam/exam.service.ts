import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Form } from '../admin/model/form.model';
import { environment } from '../../environments/environment';
import { Observable, tap,map, of,catchError,last, switchMap } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AnswerData } from '../shared/model/answer-data.model';
import { Media } from '../shared/model/media.model';
import { LoaderService } from '../shared/services/loader.service';
import { LoadingProgres } from '../shared/model/loading-progress';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient, private loaderService: LoaderService) { }

  sendAnswer(data:AnswerData):Observable<any>{
    this.loaderService.setLoad(0);
    const userStr:string = localStorage.getItem('user')!;
    const user:User = JSON.parse(userStr);
    data.userId = user.id;
    if(data.questionType === 'video' ||data.questionType === 'videoBlitz'){
      return this.sendFileToServer(data);
    }else{
      return this.http.post(environment.api+"/exam",data)
    }
  }

  sendFileToServer(data:any){
    const option = data.answerOptions!.find((option:any) => option.video);
    const blob = option!.video.blob
    const videoType = option!.video.type;
    const file = new File([blob], "myvideo."+videoType,{type:"video/"+videoType});
    const fileUploadMetaDataList: {}[] = [];
    fileUploadMetaDataList.push({resolution:option!.video.resolution})
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('fileUploadMetadataList', JSON.stringify(fileUploadMetaDataList));
    let headers = new HttpHeaders();
    headers = headers.delete('Content-Type');
    const req = new HttpRequest("POST", environment.api+"/upload", formData,{headers, reportProgress: true });
    return this.http.request<any>(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.updateProgress(message)),
      last(),        
      switchMap((media:any)=>{
          data.answerOptions = [{videoLink:media.url}] 
          return this.http.post(environment.api+"/exam",data)
      }),
      catchError(this.handleError(file))
    );
  }

  loadForm(link: string) {
    return this.http.get<Form>(environment.api+"/exam?link="+link)
  }

  updateProgress(msg:any ){
    if(msg && msg.state === 'UploadProgress' && msg.loading){
      this.loaderService.setLoad(msg.loading)
    }    
  }

  handleError(e:any):any{
    console.log(e);    
  }

  private getEventMessage(event: HttpEvent<Media>, file: File): LoadingProgres | Media {
    switch (event.type) {
      case HttpEventType.Sent:
        return  {state:'Sent', loading:0, msg:`Uploading file "${file.name}" of size ${file.size}.`}; ;
      case HttpEventType.UploadProgress:        
        const loading = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        return {state:'UploadProgress', loading};
      case HttpEventType.Response:
        if(event.body === null){
          throw Error('response empty: '+ event)
        }
        return event.body!;
      default:
        return {state:'Other', msg:`File "${file.name}" surprising upload event: ${event.type}.`};
    }
  }

}
