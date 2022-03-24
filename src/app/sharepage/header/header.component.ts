import { Component, OnInit, Input } from '@angular/core';

import { BookStoreAPI } from '../../services/bookstore.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;
  listCart: any;
  count: any;
  constructor(private bookstore: BookStoreAPI, private router: Router) { }
  UserLogined: any;
  ngOnInit(): void {

  }

  isHasCart() {
    if (sessionStorage.getItem('listCart') != null) {
      this.listCart = JSON.parse(sessionStorage.getItem('listCart')!);
      this.count = this.listCart.length;
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    return this.data.Role;
  }

  isLogined() {
    if (sessionStorage.getItem('UserLogin') != null) {
      this.data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      if (this.data.HoTen != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  Signout() {
    sessionStorage.removeItem('UserLogin');
    this.router.navigate(['/login']);
  }

}
