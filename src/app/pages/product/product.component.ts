import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI, private router: Router) { }
  categories: any;
  Book: any;
  Messager: any = "";
  Search: any = "";
  p: any = "";

  key = "Giaban";
  reverse: boolean = false;

  ngOnInit(): void {
    this.getCategory();
    this.getbook()
  }

  getCategory() {
    this.bookapi.getCategory()
      .subscribe(data => {
        this.categories = data;
      })
  }

  getbook() {
    this.bookapi.getAllBook().subscribe(data => {
      this.Book = data
    })
  }

  GetByChuDe(id: string) {
    this.bookapi.getBookByChuDe(id).subscribe(data => {
      if (data[0].Messager != null) {
        this.Messager = data[0].Messager;
      } else {
        this.Messager = "";
        this.Book = data;
        this.p = 1
      }
    })
  }

  sort() {
    this.reverse = false
  }
  sort2() {
    this.reverse = true
  }
  goDetails(id: string) {
    console.log('was clicked');
    this.router.navigate(['detail', id]);
  }
  changeText(event: any) {
    this.p = 1
  }

}
