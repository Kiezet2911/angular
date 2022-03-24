import { Component, OnInit } from '@angular/core';
import { BookStoreAPI } from '../../services/bookstore.services';
import { resprofile, reqprofile, reqprofilenoimg } from '../../services/Classes/profile'
import { reqpass, respass } from '../../services/Classes/changepass'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private bookstoreapi: BookStoreAPI) { }

  hovaten: any;
  Email: any;
  diachi: any;
  sdt: any;
  date: any;

  data: any
  img: any = ""
  imgchoose: any = ""
  resProfile: resprofile | undefined;

  matkhauhientai: any;
  matkhaumoi: any;
  xacnhanmatkhau: any;
  resPass: respass | undefined;

  onFileSelected(event: any) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        this.img = e.target?.result
      }
      this.imgchoose = event.target
    }
  }

  ngOnInit() {
    this.action_In_ngOnInit()
  }

  action_In_ngOnInit() {
    if (sessionStorage.getItem('UserLogin') != null) {
      this.data = JSON.parse(sessionStorage.getItem('UserLogin')!);
      this.bookstoreapi.getProfile(this.data.id).subscribe(res => {
        this.hovaten = res.HoTen
        this.Email = res.Email
        this.diachi = res.DiachiKH
        this.sdt = res.DienthoaiKH
        this.date = res.Ngaysinh
        this.img = res.Anh
      })
    } else {
      console.log("Rỗng");
    }
  }

  updateInfo() {
    let check: boolean[] = []
    check.push(!(this.hovaten == "")); check.push(!(this.Email == "")); check.push(!(this.diachi == "")); check.push(!(this.sdt == "")); check.push(!(this.date == ""));
    let isTrue = (va: boolean) => va === true

    if (check.every(isTrue)) {
      if (this.data.id != null) {
        if (!(this.imgchoose == "")) {
          const formdata = new FormData();
          for (let i = 0; i < this.imgchoose.files.length; i++) {
            formdata.append("img", this.imgchoose.files[i]);
          }
          console.log(formdata)
          this.bookstoreapi.UploadImage(formdata).subscribe(res => {
            let linkAnh = "https://bookingapiiiii.herokuapp.com/open-image/" + res.data;
            let bodyProfile = new reqprofile(this.data.id, linkAnh, this.hovaten, this.Email, this.diachi, this.sdt, this.date);
            this.bookstoreapi.putupdateprofile(bodyProfile).subscribe(
              data => {
                this.resProfile = data;
                if (sessionStorage.getItem("UserLogin")) {
                  const UserLogin = JSON.parse(sessionStorage.getItem("UserLogin")!)
                  UserLogin.HoTen = data.HoTen;
                  sessionStorage.setItem("UserLogin", JSON.stringify(UserLogin));
                }
                alert(this.resProfile.Messenger);
              }
            )
          })
        } else {
          let bodyProfilenoimg = new reqprofilenoimg(this.data.id, this.hovaten, this.Email, this.diachi, this.sdt, this.date);
          this.bookstoreapi.putupdateprofile(bodyProfilenoimg).subscribe(
            data => {
              this.resProfile = data;
              if (sessionStorage.getItem("UserLogin")) {
                const UserLogin = JSON.parse(sessionStorage.getItem("UserLogin")!)
                UserLogin.HoTen = data.HoTen;
                sessionStorage.setItem("UserLogin", JSON.stringify(UserLogin));
              }
              alert(this.resProfile.Messenger);
            }
          )
        }

      }
    } else {
      alert("Vui Lòng Điền Đầy Đủ Thông Tin")
    }
  }

  UpdataPass() {
    let check: boolean[] = []
    check.push(!(this.matkhauhientai == "")); check.push(!(this.matkhaumoi == "")); check.push(!(this.xacnhanmatkhau == ""));
    let isTrue = (va: boolean) => va === true
    console.log(check)
    if (check.every(isTrue)) {
      if (this.data.id != null) {
        console.log(this.data.id)
        let bodypass = new reqpass(this.data.id, this.matkhauhientai, this.matkhaumoi, this.xacnhanmatkhau);
        this.bookstoreapi.putupdatapass(bodypass).subscribe(
          data => {
            this.resPass = data;
            this.matkhauhientai = '';
            this.matkhaumoi = '';
            this.xacnhanmatkhau = '';
            alert(this.resPass.Messenger);
          }
        )
      }
    } else {
      alert("Vui Lòng Điền Đầy Đủ Thông Tin")
    }
  }
}
