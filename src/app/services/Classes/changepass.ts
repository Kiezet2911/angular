export interface respass {
    id: string;
    Messenger:string;
    Matkhaued: string;
    newMatkhau: string;
    ConfirmMatKhau:string
    
}

export class reqpass {
    constructor(id: any, Matkhaued:any,newMatkhau:any,ConfirmMatKhau:any) {
        this.id = id;
        this.Matkhaued = Matkhaued;
        this.newMatkhau = newMatkhau;
        this.ConfirmMatKhau = ConfirmMatKhau;
    }
    id: string = '';
    Matkhaued: string = '';
    newMatkhau: string = '';
    ConfirmMatKhau:string = '';
}