import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { itemCart } from 'src/app/services/Classes/Book';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  id: any;
  book: any;
  unitprice: number = 0;
  Soluongton: number = 0;
  listCart: itemCart[] = [];
  listSameCategoryBooks: any;

  constructor(private router: Router, private Activateroute: ActivatedRoute, private bookapi: BookStoreAPI) { }

  ngOnInit(): void {
    //Get param id on router link /detail/:id
    this.id = "" + this.Activateroute.snapshot.params['id'];

    //You can call api details book with that id in the following line down here:
    //Code:
    this.getBook(this.id)
  }

  lessProducts() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    if (inputNum.value == "1") {
      inputNum.value = "1";
    } else {
      inputNum.value = "" + (Number(inputNum.value) - 1);
    }
  }

  moreProducts() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    if (Number(inputNum.value) == this.Soluongton) {
    } else {
      inputNum.value = "" + (Number(inputNum.value) + 1);
    }
  }

  getBook(id: any) {
    this.bookapi.get1Book(id).subscribe(data => {
      this.book = data.data
      this.listSameCategoryBooks = data.BookLienQuan
      this.unitprice = data.data[0].Giaban;
      this.Soluongton = data.data[0].Soluongton;
    })
  }

  checkSoluongton() {
    if (this.Soluongton <= 0) {
      return true;
    }
    return false;
  }

  addCart() {
    let inputNum = <HTMLInputElement>document.getElementById("inputNum");
    let newItem: itemCart = new itemCart();
    newItem.idcart = this.id;
    newItem.count = Number(inputNum.value);
    newItem.unitprice = this.unitprice;
    newItem.Anh = this.book[0].Anh;
    newItem.Mota = this.book[0].Mota;
    newItem.Soluongton = this.book[0].Soluongton;
    newItem.Tensach = this.book[0].Tensach;
    let listSess = JSON.parse(sessionStorage.getItem('listCart')!)
    if (listSess != null) {
      let obj = listSess.findIndex((x: any) => x.idcart === newItem.idcart)
      if (obj == -1) {
        listSess.push(newItem);
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      } else {
        listSess[obj].count += newItem.count
        sessionStorage.setItem('listCart', JSON.stringify(listSess))
      }

    } else {
      this.listCart.push(newItem);
      sessionStorage.setItem('listCart', JSON.stringify(this.listCart))
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['Trước', 'Sau'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  goDetails(id: string) {
    console.log('was clicked');
    this.router.navigate(['detail', id]).then(() => {
      window.location.reload();
    })
  }
}


