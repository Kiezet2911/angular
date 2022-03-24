export class reqAuthor{

    TenTG:String = '';
    Diachi:String = '';
    Tieusu:String = '';
    Dienthoai:String = '';

    constructor(TenTG:String,Diachi:String,Tieusu:String,Dienthoai:String){

        this.TenTG = TenTG
        this.Diachi = Diachi
        this.Tieusu = Tieusu
        this.Dienthoai = Dienthoai
    }
}

export interface resAuthor{
    TenTG:String;
    Diachi:String;
    Tieusu:String;
    Dienthoai:String;
}