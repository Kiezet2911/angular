export interface Book {
    id: string;
    Tensach: string;
    Giaban: Number;
    Anh: string;
    TenTG: string;
}
export interface Banner {
    _id: string,
    Anh1: string;
    Anh2: string;
    Anh3: string;
}
export interface newBook {
    id: string;
    Tensach: string;
    Mota: string,
    Anh: string;
    TenTG: string;
}


export interface resinsertbook {
    _id: string;
    Tensach: string;
    Giaban: number;
    Mota: string;
    Anhbia: string;
    Soluongton: number;
    MaCD: string[];
    MaNXB: string;
    MaTacGia: string;
}
export class reqinsertbook {

    constructor(Tensach: string, Giaban: number, Mota: string, Anhbia: string, Soluongton: number, MaCD: any[], MaNXB: string, MaTacGia: string) {
        this.Tensach = Tensach;
        this.Giaban = Giaban;
        this.Mota = Mota;
        this.Anhbia = Anhbia;
        this.Soluongton = Soluongton;
        this.MaCD = MaCD;
        this.MaNXB = MaNXB;
        this.MaTacGia = MaTacGia;
    }
    Tensach: string = '';
    Giaban: number = 0;
    Mota: string = '';
    Anhbia: string = '';
    Soluongton: number = 0;
    MaCD: any[] = [];
    MaNXB: string = '';
    MaTacGia: string = '';

}
export class reqBookSoluongTon {
    constructor(id: any, Soluongton: number, Giaban: number) {
        this.id = id;
        this.Soluongton = Soluongton;
        this.Giaban = Giaban;

    }
    id: string = '';
    Soluongton: number = 0;
    Giaban: number = 0;

}


export interface Book1 {
    id: string;
    Tensach: string;
    Mota: string,
    Giaban: Number;
    Anh: string;
    TenTG: string;
    TenNXB: string;
}
export interface Category {
    _id: string;
    TenChuDe: string;
}

export class itemCart {
    idcart: string = '';
    count: number = 0;
    Anh: string = '';
    Mota: string = '';
    Tensach: string = '';
    unitprice: number = 0;
    Soluongton: number = 0;

    setTensach(Tensach: string) {
        this.Tensach = Tensach;
    }

    getTensach() {
        return this.Tensach;
    }

    setAnh(Anh: string) {
        this.Anh = Anh;
    }

    getAnh() {
        return this.Anh;
    }

    setSoluongton(Soluongton: number) {
        this.Soluongton = Soluongton;
    }

    getSoluongton() {
        return this.Soluongton;
    }

    setMota(Mota: string) {
        this.Mota = Mota;
    }

    getMota() {
        return this.Mota;
    }

    setIdCart(idcart: string) {
        this.idcart = idcart;
    }

    setCount(count: number) {
        this.count = count;
    }

    setunitprice(unitprice: number) {
        this.unitprice = unitprice;
    }

    getIdCart() {
        return this.idcart;
    }

    getCount() {
        return this.count;
    }

    getunitprice() {
        return this.unitprice;
    }

}

export class reqChuDe {
    TenChuDe: String = '';

    constructor(TenChuDe: String) {
        this.TenChuDe = TenChuDe;
    }
}
