import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookStoreAPI } from 'src/app/services/bookstore.services';

@Component({
  selector: 'app-historypay',
  templateUrl: './historypay.component.html',
  styleUrls: ['./historypay.component.css']
})
export class HistorypayComponent implements OnInit {

  constructor(private bookapi: BookStoreAPI) { }

  ListDonHang: any
  CTDH: any
  DonHangByID: any
  Day: any
  userid: any
  Today: any
  mess: any
  p: any
  pCTDH: any

  Messager: any = "";
  ngOnInit(): void {
    this.action_ngOnInit()

  }

  action_ngOnInit() {
    this.Today = new Date();
    this.Day = new Date();
    this.Day.setDate(this.Day.getDate() - 7);

    if (sessionStorage.getItem("UserLogin")) {
      let datauser = JSON.parse(sessionStorage.getItem("UserLogin")!);
      if (datauser["id"] != null) {
        this.userid = datauser["id"]
        this.GetDonHang(this.userid, this.Day, this.Today)
      } else {
      }
    } else {
    }

  }

  GetDonHang(id: string, ngaydat: string, gioihan: string) {
    this.bookapi.getdonhangforuser(id, ngaydat, gioihan).subscribe(data => {
      this.ListDonHang = data
      this.mess = "";
    }, err => {
      if (err.status == 404) {
        this.ListDonHang = []
        this.mess = "Không Có Đơn Hàng Trong Ngày Này";
      }
    });
  }

  dateFrom(event: any) {
    let today = <HTMLInputElement>document.getElementById("dateTo");
    this.GetDonHang(this.userid, event.target.value, today.value)
    this.p = 1
  };
  dateTo(event: any) {
    let day = <HTMLInputElement>document.getElementById("dateFrom");
    this.GetDonHang(this.userid, day.value, event.target.value)
    this.p = 1
  };

  showDialog_HistoryPay(id: string) {
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "block";

    this.bookapi.getCTDonHang(id).subscribe(da => {
      this.CTDH = da
    })
    this.bookapi.GetDonHangById(id).subscribe(da => {
      this.DonHangByID = da
    })
  }

  closeDialog_HistoryPay() {
    let details = <HTMLElement>document.getElementById("DialogDetailsHistoryPay__Container");
    details.style.display = "none";
  }
}
