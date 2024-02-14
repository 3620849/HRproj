import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserStore } from "../shared/store/user.store";
import { inject } from "@angular/core";
import { getState } from "@ngrx/signals";

export const AdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {
    let st =  getState(inject(UserStore));

    return !!st.user &&  st.user.role === 'admin' ? true : inject(Router).navigateByUrl('/login');
  };