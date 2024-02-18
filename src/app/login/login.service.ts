import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs';
import { User } from '../shared/model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:WritableSignal<any> = signal(null);
  constructor(private http:HttpClient) { }
  login(login:string,password:string):Observable<User>{
    return this.http.post<User>(environment.api+"/login",{login, password});
  }

  logout(){
    this.user.update(el=>(null));
  }
  
  testeeLogin(token:string):Observable<any>{
    let res = new Subject();
    if(token === 'abcdefg123'){
      of({
        name:'Jared Bodrik',token:'abcdefg123', role:'testee',photo:'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png'
      }).subscribe(user=>{
        this.user.set(user);
       setTimeout(()=>{res.next(user);},2000); 
      })
    }  else {
      setTimeout(()=>{res.next({
        error: 'Ooops something went wrong, this link not exist any more',
        code: 404
      });},2000);
    }
    return res;  
  }
  //TODO add to store and connect to html
  registerUser(registerObj:any):Observable<any>{
    return this.http.post<User>(environment.api+"/register",registerObj);
  }
}
