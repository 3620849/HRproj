import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:WritableSignal<any> = signal(null);
  constructor() { }
  login(email:string,pass:string){
    if(email==='a@gmail.com' && pass==='123'){
      this.user.update(el=>({name:'Amy Elsner', role:'admin',photo:'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png'}))
    }
  }
  logout(){
    this.user.update(el=>(null));
  }
  testeeLogin(token:string):Observable<any>{
    let res = new Subject();
    if(token === 'abcdefg123'){
      of({
        name:'Jared Bodrik', role:'testee',photo:'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png'
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
}
