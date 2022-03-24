export interface Account{
    Messenger:string;
    id:string;
    HoTen:string;
    Role:boolean;
}

export interface resRegister{
    Messenger:string;
    id:string;
    Taikhoan:string;
    HoTen:string;
    Role:boolean;
}

export class reqRegister{
    constructor(HoTen:any,Taikhoan:any,MatKhau:any,ConfirmMatKhau:any){
        this.HoTen=HoTen;
        this.Taikhoan=Taikhoan;
        this.Matkhau=MatKhau;
        this.ConfirmMatKhau=ConfirmMatKhau;

    }
    HoTen: string = '';
    Taikhoan: string = '';
    Matkhau: string = '';
    ConfirmMatKhau: string = '';

}
