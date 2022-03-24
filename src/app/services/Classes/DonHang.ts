export class reqDatHang {
    constructor(Dathanhtoan: boolean, Tinhtranggiaohang: boolean, Ngaydat: string, Ngaygiao: string, MaKH: string) {
        this.Dathanhtoan = Dathanhtoan;
        this.Tinhtranggiaohang = Tinhtranggiaohang;
        this.Ngaydat = Ngaydat;
        this.Ngaygiao = Ngaygiao;
        this.MaKH = MaKH;
    }
    Dathanhtoan = false;
    Tinhtranggiaohang = false;
    Ngaydat: string;
    Ngaygiao: string;
    MaKH: string;
}
export class reqDatHangnodategiao {
    constructor(Dathanhtoan: boolean, Tinhtranggiaohang: boolean, Ngaydat: string, TongTien: number, MaKH: string, MasachCheck: any[], SoluongCheck: any[]) {
        this.Dathanhtoan = Dathanhtoan;
        this.Tinhtranggiaohang = Tinhtranggiaohang;
        this.Ngaydat = Ngaydat;
        this.TongTien = TongTien;
        this.MaKH = MaKH;
        this.MasachCheck = MasachCheck;
        this.SoluongCheck = SoluongCheck;
    }
    Dathanhtoan = false;
    Tinhtranggiaohang = false;
    Ngaydat: string;
    TongTien: number;
    MaKH: string;
    MasachCheck: any[] = []
    SoluongCheck: any[] = []
}

export interface resDatHang {
    Messager: string;
    Dathanhtoan: boolean;
    Tinhtranggiaohang: boolean;
    Ngaydat: Date;
    Ngaygiao: Date;
    MaKH: string;
    _id: string;
}


export class reqCTDonHang {
    constructor(MaDonHang: string, Masach: string, Soluong: number, Dongia: number) {
        this.MaDonHang = MaDonHang;
        this.Masach = Masach;
        this.Soluong = Soluong;
        this.Dongia = Dongia;
    }
    MaDonHang = "";
    Masach = "";
    Soluong = 0;
    Dongia = 0;
}
export interface resCTDonHang {
    Messager: string;
}