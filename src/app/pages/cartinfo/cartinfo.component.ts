import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';
import { reqDatHangnodategiao, reqCTDonHang } from '../../services/Classes/DonHang'
import { __await } from 'tslib';
@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI, private router: Router) { }
  UserLogin: any
  Date: any
  Book: any
  IDMaDonHang: any
  Total: number = 0;
  SoluongTon: number = 0;
  mess: any;

  ngOnInit(): void {
    this.actionIn_ngOnInit();
  }

  actionIn_ngOnInit() {
    sessionStorage.removeItem("Mess")
    this.Date = new Date();
    this.getbook();
    this.Sum();
    this.checkUserLogin();
    this.get_Profile_User();
  }

  get_Profile_User() {
    if (this.checkUserLogin()) {
      this.bookapi.getProfile(JSON.parse(sessionStorage.getItem("UserLogin")!).id).subscribe(data => {
        this.UserLogin = [data]
      })
    }
  }

  checkUserLogin() {
    if (sessionStorage.getItem("UserLogin")) {
      let data = JSON.parse(sessionStorage.getItem("UserLogin")!)
      if (data.id != null) {
        return true;
      }
      return false;
    }
    return false;
  }


  async DatHang() {
    let isNull_Session = this.Book == null

    if (isNull_Session) {
      alert("Giỏ Hàng Hiện Tại Đang Trống\nVui Lòng Chọn Sách Bạn Muốn Mua")
    } else {
      let isNull_LoginSession = sessionStorage.getItem("UserLogin") == null
      if (!isNull_LoginSession) {

        let data = JSON.parse(sessionStorage.getItem("UserLogin")!);
        let isNull_login = data.id == null

        if (!isNull_login) {
          //
          const arrayidBook: any[] = [];
          const arraycountBook: any[] = [];
          //Push IDSACH với Số lượng mua của cuốn sách để truyền xuống api để Kiểm Số lượng tồn
          for (const id of this.Book) {
            arrayidBook.push(id.idcart);
            arraycountBook.push(id.count);
          }
          //
          let Body = new reqDatHangnodategiao(false, false, this.Date, this.Total, data.id, arrayidBook, arraycountBook);
          console.log(Body)
          this.bookapi.DatHang(Body).subscribe(data => {
            //Nếu Có biến Mess Tức Có Sách Bị Vượt Quá Số Lượng Hiện Có Trong Kho Hàng
            if (data.Messager != null) {
              alert(data.Messager)
            } else {
              for (let book of this.Book) {
                let body = new reqCTDonHang(data._id, book.idcart, book.count, book.unitprice);
                this.bookapi.CTDatHang(body).subscribe(data => {
                  if (data.Messager != null) {
                    this.mess = data.Messager;
                  } else {
                    this.mess = "Đặt Hàng Thành Công\nXin Vui Lòng Kiểm Tra Lịch Sử Mua Hàng"
                    if (this.UserLogin[0].Email != null || typeof this.UserLogin[0].Email != "undefined" || this.UserLogin[0].Email != "") {
                      this.bookapi.SendMail(this.UserLogin[0].Email).subscribe(res => {
                      })
                    }
                    sessionStorage.removeItem("listCart")
                    this.Sum();
                    this.Book = null
                  }
                })
              }
            }
          })
        } else {
          this.router.navigate(['login']);
        }

      } else {
        this.router.navigate(['login']);
      }
    }
  }

  delete(cartID: any) {
    if (sessionStorage.getItem("listCart")) {
      const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
      for (let i = 0; i < sessionCart.length; i++) {
        if (cartID === sessionCart[i].idcart) {
          sessionCart.splice(i, 1);
          sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
        }
      }
      if (sessionCart.length <= 0) {
        this.Book = null
        sessionStorage.removeItem("listCart")
      } else {
        this.Book = sessionCart
      }
    }
    this.Sum();
  }

  Sum() {
    if (sessionStorage.getItem("listCart")) {
      const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
      this.Total = sessionCart.reduce((acc: any, val: any) => {
        return acc + (val.count * val.unitprice)
      }, 0)
    } else {
      this.Total = 0;
    }
  }

  getbook() {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    if (sessionCart != null) {
      this.Book = sessionCart
    } else {
      this.Book = null
    }
  }

  lessProducts(i: any) {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    for (let index = 0; index < sessionCart.length; index++) {
      if (i == sessionCart[index].idcart) {
        if (sessionCart[index].count == 1) {
          sessionCart[index].count = 1
        } else {
          sessionCart[index].count--;
        }
      }
    }
    sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
    this.Book = sessionCart
    this.Sum();
  }

  moreProducts(i: any) {
    const sessionCart = JSON.parse(sessionStorage.getItem("listCart")!)
    for (let index = 0; index < sessionCart.length; index++) {
      if (i == sessionCart[index].idcart) {
        if (sessionCart[index].count == sessionCart[index].Soluongton) {
          alert("Hiện Sách " + sessionCart[index].Tensach + " Chỉ Còn: " + sessionCart[index].Soluongton + " Cuốn")
        } else {
          sessionCart[index].count++;
        }
      }
    }
    sessionStorage.setItem("listCart", JSON.stringify(sessionCart));
    this.Book = sessionCart
    this.Sum();
  }

  onCheckAll() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    let checkItems = document.querySelectorAll("#checkbox__product") as NodeListOf<HTMLInputElement>;
    if (checkAll && checkAll.checked) {
      checkItems.forEach(item => item.checked = true);
    } else {
      checkItems.forEach(item => item.checked = false);
    }
  }

  ifAllCheck() {
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    if (checkAll && checkAll.checked) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteAll() {
    sessionStorage.removeItem("listCart");
    let checkAll = <HTMLInputElement>document.getElementById("checkbox__all-product");
    checkAll.checked = false;
    this.getbook();
    this.Sum();
  }

  ifEmpty() {
    if (this.Book == null) {
      return true
    }
    else return false;
  }
}
