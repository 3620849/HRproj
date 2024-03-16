import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs';
import { User } from '../shared/model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Registration } from '../shared/model/registration.model';

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

  registerUser(registerObj:Registration):Observable<any>{
    return this.http.post<User>(environment.api+"/register",registerObj);
  }
}
