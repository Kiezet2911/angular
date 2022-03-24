export class reqNXB {
    TenNXB: String = '';
    Diachi: String = '';
    DienThoai: String = '';
    constructor(TenNXB: String, Diachi: String, DienThoai: String) {
        this.TenNXB = TenNXB;
        this.Diachi = Diachi;
        this.DienThoai = DienThoai;
    }
}

export interface resNXB {
    TenNXB: String;
    Diachi: String;
    DienThoai: String;
}
export interface resALL {
    chude: String;
    NXB: String;
    tacgia: String;
}