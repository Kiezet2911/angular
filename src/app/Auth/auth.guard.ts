import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router) { }
  canActivate():boolean {
    if (sessionStorage.getItem('UserLogin') != null) {
      let data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      if (data.id != null) {
        return true;
      }else{ 
          this.router.navigate(['login']);
          return false; 
      }
    }else{
      this.router.navigate(['login']);
      return false;
    } 
  }
}
@Injectable({
  providedIn: 'root'
})
export class isLogined implements CanActivate{
  constructor(private router:Router){}
  canActivate():boolean {
    if (sessionStorage.getItem('UserLogin') != null) {
      let data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      if (data.id != null) {
        this.router.navigate(['']);
        return false;
      }else{ 
          return true; 
      }
    }else return true;
  }
}

@Injectable({
  providedIn: 'root'
})

export class isAdmin implements CanActivate{
  constructor(private router:Router){}
  canActivate():boolean {
    if (sessionStorage.getItem('UserLogin') != null) {
      let data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      if (data.id != null && data.Role == true) {
        return true;
      }else{ 
          return false; 
      }
    }else return false;
  }
}
