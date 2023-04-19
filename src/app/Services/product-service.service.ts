import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';
import {
  BagProduct,
  BagProductAdd,
  BagUser,
  Bill,
  BillProduct,
  brand,
  Category,
  imageproduct,
  ListCode,
  Nsx,
  product,
  Size,
  SizeProduct,
  UpdateUser,
  User,
  WishListProduct,
  WishListProductUpdate,
  WishListUser,
} from '../Model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  baseAPIurl: string = API.baseAPI;
  constructor(private http: HttpClient) {}

  GetAllUser(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseAPIurl + '/api/User/GetAllUser'
    );
  }
  GetAllProduct(): Observable<product[]> {
    return this.http.get<product[]>(
      this.baseAPIurl + '/api/product/getallproduct'
    );
  }
  GetAllImgProduct(): Observable<imageproduct[]> {
    return this.http.get<imageproduct[]>(
      this.baseAPIurl + '/api/imageproduct/getallimageproduct'
    );
  }
  GetImgProductByID(id: string): Observable<imageproduct> {
    return this.http.get<imageproduct>(
      this.baseAPIurl + '/api/imageproduct/getimageproductbyid' + id
    );
  }
  GetProductByID(id: number): Observable<product> {
    return this.http.get<product>(
      this.baseAPIurl + '/api/Product/GetProductByID' + id
    );
  }
  GetBrandByID(id: string): Observable<brand> {
    return this.http.get<brand>(
      this.baseAPIurl + '/api/Brand/GetBrandByID' + id
    );
  }
  GetAllBrand(): Observable<brand[]> {
    return this.http.get<brand[]>(
      this.baseAPIurl + '/api/Brand/GetAllBrand'
    );
  }
  GetNsxByID(id: string): Observable<Nsx> {
    return this.http.get<Nsx>(this.baseAPIurl + '/api/Nsx/GetNsxByID' + id);
  }
  Login(user: User): Observable<number> {
    return this.http.post<number>(this.baseAPIurl + '/api/User/GetUser', user);
  }
  Register(user: User): Observable<number> {
    return this.http.post<number>(this.baseAPIurl + '/api/User/AddUser', user);
  }
  UpdateUser(user: UpdateUser): Observable<number> {
    return this.http.post<number>(this.baseAPIurl + '/api/User/UpdateUser', user);
  }
  CheckEmailUser(email: string): Observable<number>{
    return this.http.get<number>(this.baseAPIurl + '/api/User/CheckEmailUser?email='+email)
  }
  GetUserID(id: number): Observable<User> {
    return this.http.get<User>(this.baseAPIurl + '/api/User/GetUserByID' + id);
  }
  AddWishList(id: number):Observable<number>{
      return this.http.get<number>(this.baseAPIurl +'/api/WishList/AddWishList' + id)
  }
  GetWishListByUserID(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseAPIurl + '/api/WishList/GetWishListByUserID' + id
    );
  }
  SetWishListCountByUserID(
    id: number,
    count: number
  ): Observable<WishListUser> {
    return this.http.get<WishListUser>(
      this.baseAPIurl +
        '/api/WishList/SetWishListCountByUserID' +
        id +
        '?count=' +
        count
    );
  }
  GetWishListAllProDuct(id: number): Observable<WishListProduct[]> {
    return this.http.get<WishListProduct[]>(
      this.baseAPIurl + '/api/CT_WishList/GetWishListByWishListId' + id
    );
  }
  GetWishListProDuct(wl: WishListProduct): Observable<number> {
    return this.http.post<number>(
      this.baseAPIurl + '/api/CT_WishList/GetWishListProduct',
      wl
    );
  }
  AddProductInWishList(wl: WishListProduct): Observable<WishListProduct> {
    return this.http.post<WishListProduct>(
      this.baseAPIurl + '/api/CT_WishList/AddProductInWishList',
      wl
    );
  }
  DeleteProductInWishList(wl: WishListProduct): Observable<WishListProduct> {
    return this.http.post<WishListProduct>(
      this.baseAPIurl + '/api/CT_WishList/DeleteProductInWishList',
      wl
    );
  }
  GetBagByUserID(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseAPIurl + '/api/Bag/GetBagByUserID' + id
    );
  }
  AddBag(id: number):Observable<number>{
    return this.http.get<number>(this.baseAPIurl +'/api/Bag/AddBag' + id)
}
  SetBagCountByUserID(id: number, count: number): Observable<BagUser> {
    return this.http.get<BagUser>(
      this.baseAPIurl + '/api/Bag/SetBagCountByUserID' + id + '?count=' + count
    );
  }
  GetBagAllProDuct(id: number): Observable<BagProductAdd[]> {
    return this.http.get<BagProductAdd[]>(
      this.baseAPIurl + '/api/CT_Bag/GetBagByBagID' + id
    );
  }
  GetBagProDuct(bag: BagProduct): Observable<number> {
    return this.http.post<number>(
      this.baseAPIurl + '/api/CT_Bag/GetBagProduct',
      bag
    );
  }
  AddProductInBag(wl: BagProductAdd): Observable<BagProductAdd> {
    return this.http.post<BagProductAdd>(
      this.baseAPIurl + '/api/CT_Bag/AddProductInBag',
      wl
    );
  }
  DeleteProductInBag(wl: BagProduct): Observable<BagProduct> {
    return this.http.post<BagProduct>(
      this.baseAPIurl + '/api/CT_Bag/DeleteProductInBag',
      wl
    );
  }
  GetAllSizeByProductId(id: number): Observable<SizeProduct[]> {
    return this.http.get<SizeProduct[]>(
      this.baseAPIurl + '/api/CT_Size/GetAllProductId' + id
    );
  }
  AddSizeByProductID(size: SizeProduct): Observable<SizeProduct> {
    return this.http.post<SizeProduct>(
      this.baseAPIurl + '/api/CT_Size/AddSizeByProductID',
      size
    );
  }
  DeleteSizeByProductID(
    productid: number,
    sizeid: number
  ): Observable<SizeProduct> {
    return this.http.get<SizeProduct>(
      this.baseAPIurl +
        '/api/CT_Size/DeleteSizeByProductID?productid=' +
        productid +
        '&SizeId=' +
        sizeid
    );
  }
  GetSizeBySizeId(id: number): Observable<Size> {
    return this.http.get<Size>(
      this.baseAPIurl + '/api/Size/GetSizeBySizeId' + id
    );
  }
  GetSize(): Observable<Size[]> {
    return this.http.get<Size[]>(
      this.baseAPIurl + '/api/Size/GetAllSize'
    );
  }
  GetCTSize(): Observable<SizeProduct[]> {
    return this.http.get<SizeProduct[]>(
      this.baseAPIurl + '/api/CT_Size/GetAllCTSize'
    );
  }
  GetAllSizeBySizeId(id: number): Observable<SizeProduct[]> {
    return this.http.get<SizeProduct[]>(
      this.baseAPIurl + '/api/CT_Size/GetAllSizeId' + id
    );
  }
  GetSizeByCTSizeId(id: number, size: number): Observable<SizeProduct> {
    return this.http.get<SizeProduct>(
      this.baseAPIurl +
        '/api/CT_Size/GetSizeByProductId?id=' +
        id +
        '&size=' +
        size
    );
  }
  GetCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.baseAPIurl + '/api/Category/GetCategory'
    );
  }

  CreateBill(Bill: Bill):Observable<Bill>{
    return this.http.post<Bill>(
      this.baseAPIurl + '/api/Bill/AddBill',Bill
    )
  }
  UpdateBill(Bill: Bill):Observable<Bill>{
    return this.http.post<Bill>(
      this.baseAPIurl + '/api/Bill/UpdateBill',Bill
    )
  }
  GetAllBill(): Observable<Bill[]> {
    return this.http.get<Bill[]>(
      this.baseAPIurl + '/api/Bill/GetAllBill'
    );
  }
  GetAllBillByUser(userid: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(
      this.baseAPIurl + '/api/Bill/GetAllBillByUserId?userid='+userid
    );
  }
  GetBillByUser(userid: number): Observable<Bill> {
    return this.http.get<Bill>(
      this.baseAPIurl + '/api/Bill/GetBillByUserId?userid='+userid
    );
  }
  CreateBillProduct(bill: BillProduct): Observable<BillProduct> {
    return this.http.post<BillProduct>(
      this.baseAPIurl + '/api/CT_Bill/CreateBillProduct',bill
    );
  }
  GetAllByBillID(billid: number): Observable<BillProduct[]> {
    return this.http.get<BillProduct[]>(
      this.baseAPIurl + '/api/CT_Bill/GetAllByBillID?id='+billid
    );
  }
  GetListCode(code: number): Observable<ListCode[]> {
    return this.http.get<ListCode[]>(
      this.baseAPIurl + '/api/ListCode/GetCode'+code
    );
  }
}
