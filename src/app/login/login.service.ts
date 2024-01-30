import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, Subject, of ,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:WritableSignal<any> = signal(null);
  constructor() { }
  login(email:string,pass:string):Observable<any>{
    let res = new Subject();
    if(email==='a@gmail.com' && pass==='123'){
      of({name:'Amy Elsner',token:'1flkgjfdldsfsioerwijdkvlfmv', role:'admin',photo:'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png'})
      .subscribe(user=>{
        this.user.set(user);
       setTimeout(()=>{res.next(user);},2000); 
      })
    }else{
      setTimeout(()=>{res.error({
        error: 'wrong login or password',
        code: 401
      });},2000);
    }
    return res;
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
}
