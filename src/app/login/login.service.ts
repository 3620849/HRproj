import { Injectable, WritableSignal, signal } from '@angular/core';

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
  testeeLogin(token:string){
    if(token === 'abcdefg123'){
      this.user.update(el=>({
        name:'Jared Bodrik', role:'testee',photo:'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png'
      }))
    }
  }
}
